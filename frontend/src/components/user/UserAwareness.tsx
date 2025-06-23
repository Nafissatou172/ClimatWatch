import React from 'react';
import { BookOpen, Clock, User, ExternalLink } from 'lucide-react';
import { mockArticles } from '../../data/mockData';

export const UserAwareness: React.FC = () => {
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
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              className="h-64 w-full object-cover md:h-full" 
              src={mockArticles[0].imageUrl}
              alt={mockArticles[0].title}
            />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="uppercase tracking-wide text-sm text-primary font-semibold font-poppins">
              Article vedette
            </div>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 font-poppins leading-tight">
              {mockArticles[0].title}
            </h2>
            <p className="mt-4 text-gray-600 font-poppins">
              {mockArticles[0].excerpt}
            </p>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <User className="w-4 h-4 mr-1" />
                <span className="font-poppins">{mockArticles[0].author}</span>
                <Clock className="w-4 h-4 ml-4 mr-1" />
                <span className="font-poppins">
                  {mockArticles[0].publishedAt.toLocaleDateString('fr-FR')}
                </span>
              </div>
              <button className="flex items-center text-primary hover:text-primary/80 font-semibold font-poppins transition-colors">
                Lire l'article
                <ExternalLink className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockArticles.slice(1).map((article) => (
          <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                src={article.imageUrl}
                alt={article.title}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 font-poppins mb-2">
                {article.title}
              </h3>
              <p className="text-gray-600 font-poppins mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <User className="w-4 h-4 mr-1" />
                  <span className="font-poppins">{article.author}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="font-poppins">
                    {article.publishedAt.toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
              <button className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors font-poppins">
                Lire l'article
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
          {[
            {
              title: "Comprendre le réchauffement climatique",
              duration: "8:32",
              thumbnail: "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=400"
            },
            {
              title: "Les gestes éco-responsables au quotidien",
              duration: "12:45",
              thumbnail: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400"
            },
            {
              title: "Adaptation aux changements climatiques",
              duration: "15:20",
              thumbnail: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400"
            }
          ].map((video, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative">
                <img 
                  className="w-full h-40 object-cover rounded-lg group-hover:opacity-90 transition-opacity" 
                  src={video.thumbnail}
                  alt={video.title}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-l-6 border-l-primary border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-poppins">
                  {video.duration}
                </div>
              </div>
              <h3 className="mt-3 font-semibold text-gray-800 font-poppins group-hover:text-primary transition-colors">
                {video.title}
              </h3>
            </div>
          ))}
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