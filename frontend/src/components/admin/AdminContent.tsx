import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, FileText, Video, Image } from 'lucide-react';
import { mockArticles } from '../../data/mockData';
import { Article } from '../../types';

export const AdminContent: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const deleteArticle = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      setArticles(prev => prev.filter(article => article.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 font-poppins mb-2">
              Gestion du contenu
            </h1>
            <p className="text-gray-600 font-poppins">
              Gérez les articles et contenus de sensibilisation
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors font-poppins"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouvel article
          </button>
        </div>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-poppins">Articles publiés</p>
              <p className="text-2xl font-bold text-primary font-poppins">{articles.length}</p>
              <p className="text-xs text-green-600 font-poppins">3 ce mois</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-poppins">Vidéos éducatives</p>
              <p className="text-2xl font-bold text-secondary font-poppins">12</p>
              <p className="text-xs text-green-600 font-poppins">2 nouvelles</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Video className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-poppins">Images partagées</p>
              <p className="text-2xl font-bold text-orange-500 font-poppins">48</p>
              <p className="text-xs text-green-600 font-poppins">12 ce mois</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Image className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 font-poppins">
            Articles de sensibilisation
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {articles.map((article) => (
            <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <img
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  src={article.imageUrl}
                  alt={article.title}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 font-poppins mb-2">
                        {article.title}
                      </h4>
                      <p className="text-gray-600 font-poppins mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span className="font-poppins">Par {article.author}</span>
                        <span className="font-poppins">
                          {article.publishedAt.toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteArticle(article.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Videos Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 font-poppins">
            Vidéos éducatives
          </h3>
          <button className="inline-flex items-center px-3 py-2 text-sm bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition-colors font-poppins">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une vidéo
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Comprendre le réchauffement climatique",
              duration: "8:32",
              views: "1,234",
              thumbnail: "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=400"
            },
            {
              title: "Les gestes éco-responsables au quotidien",
              duration: "12:45",
              views: "2,156",
              thumbnail: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400"
            },
            {
              title: "Adaptation aux changements climatiques",
              duration: "15:20",
              views: "987",
              thumbnail: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400"
            }
          ].map((video, index) => (
            <div key={index} className="group">
              <div className="relative">
                <img 
                  className="w-full h-40 object-cover rounded-lg" 
                  src={video.thumbnail}
                  alt={video.title}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-white rounded-full text-primary hover:bg-gray-100 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white rounded-full text-red-600 hover:bg-gray-100 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-poppins">
                  {video.duration}
                </div>
              </div>
              <div className="mt-3">
                <h4 className="font-semibold text-gray-800 font-poppins group-hover:text-primary transition-colors">
                  {video.title}
                </h4>
                <p className="text-sm text-gray-500 font-poppins mt-1">
                  {video.views} vues
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Article Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 font-poppins mb-4">
              Créer un nouvel article
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                  Titre de l'article
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 font-poppins focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ex: Comment se protéger des vagues de chaleur"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                  Auteur
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 font-poppins focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Dr. Sophie Martin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                  Résumé
                </label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 font-poppins focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Résumé de l'article..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                  Contenu de l'article
                </label>
                <textarea
                  rows={8}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 font-poppins focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Contenu complet de l'article..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                  URL de l'image
                </label>
                <input
                  type="url"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 font-poppins focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors font-poppins"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors font-poppins"
                >
                  Publier l'article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};