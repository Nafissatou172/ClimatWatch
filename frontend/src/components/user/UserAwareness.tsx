import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

type Article = {
  id: number;
  titre: string;
  contenu: string;
  auteur: string;
  type: string;
  date_publication: string;
  image_url?: string;
};

type Video = {
  id: number;
  titre: string;
  duree: string;
  url_video: string;
};

export const UserAwareness: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    axios.get<Article[]>('http://localhost:8000/api/articles/')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des articles:', error);
      });
  }, []);

  useEffect(() => {
    axios.get<Video[]>('http://localhost:8000/api/videos/')
      .then(response => {
        console.log("Videos API response:", response.data); // Vérifier les données reçues
        setVideos(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des vidéos:', error);
      });
  }, []);

  // Fonction pour transformer URL Youtube en URL embed
  const getYoutubeEmbedUrl = (url: string): string => {
    try {
      const videoId = new URL(url).searchParams.get('v');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } catch {
      return url;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-800 font-poppins mb-2">
          Sensibilisation
        </h1>
        <p className="text-gray-600 font-poppins">
          Découvrez des contenus éducatifs sur le climat et l'environnement
        </p>
      </div>

      {/* Featured Article */}
      {articles.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                className="w-full h-85 object-cover group-hover:scale-105 transition-transform duration-300" 
                src={articles[0].image_url || "https://via.placeholder.com/400"} 
                alt={articles[0].titre}
              />
            </div>
            <div className="p-8 md:w-1/2">
              <div className="uppercase tracking-wide text-sm text-primary font-semibold font-poppins">
                Article vedette
              </div>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 font-poppins leading-tight">
                {articles[0].titre}
              </h2>
              <p className="mt-4 text-gray-600 font-poppins">
                {articles[0].contenu.slice(0, 300)}...
              </p>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span className="font-poppins">{articles[0].auteur}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="font-poppins">
                      {new Date(articles[0].date_publication).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
                <button className="flex items-center text-primary hover:text-primary/80 font-semibold font-poppins transition-colors">
                  <Link to={`/articles/${articles[0].id}`}>
                    Lire l'article
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.slice(1).map((article) => (
          <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                src={article.image_url || "https://via.placeholder.com/400"} 
                alt={article.titre}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 font-poppins mb-2">
                {article.titre}
              </h3>
              <p className="text-gray-600 font-poppins mb-4">
                {article.contenu.slice(0, 200)}...
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span className="font-poppins">{article.date_publication}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="font-poppins">
                    {new Date(article.auteur).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
              <button className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors font-poppins">
                <Link to={`/articles/${article.id}`}>
                  Lire l'article
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Educational Videos Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 font-poppins mb-6">
          Vidéos éducatives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => {
            const isYoutube = video.url_video.includes("youtube.com") || video.url_video.includes("youtu.be");
            return (
              <div key={video.id} className="group cursor-pointer relative">
                <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  {isYoutube ? (
                    <iframe
                      src={getYoutubeEmbedUrl(video.url_video)}
                      className="w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video.titre}
                    />
                  ) : (
                    <video 
                      controls 
                      src={video.url_video} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-poppins select-none">
                    {video.duree}
                  </div>
                </div>
                <h3 className="mt-3 font-semibold text-gray-800 font-poppins group-hover:text-primary transition-colors">
                  {video.titre}
                </h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 font-poppins mb-6">
          Conseils pratiques
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "💧 Économisez l'eau en récupérant l'eau de pluie",
            "🌱 Privilégiez les transports en commun ou le vélo",
            "♻️ Triez vos déchets et compostez vos biodéchets",
            "🏠 Améliorez l'isolation de votre domicile",
            "🌡️ Réglez votre thermostat à 19°C en hiver",
            "☀️ Exploitez l'éclairage naturel autant que possible"
          ].map((tip, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-gray-700 font-poppins">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
