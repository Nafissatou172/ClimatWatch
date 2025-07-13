import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

type Article = {
  id: number;
  titre: string;
  contenu: string;
  auteur: string;
  type: string;
  date_publication: string;
  image_url?: string;
};

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get<Article>(`http://localhost:8000/api/articles/${id}/`)
      .then(res => {
        setArticle(res.data);
      })
      .catch(err => {
        console.error(err);
        setArticle(null);
      })
      .then(() => setLoading(false));
  }, [id]);

  const handleCommentSubmit = () => {
    if (!comment.trim()) {
      alert("Le commentaire est vide !");
      return;
    }
    // Ici tu peux faire un appel API pour sauvegarder le commentaire
    alert(`Commentaire soumis : ${comment}`);
    setComment('');
  };

  if (loading) return <div className="text-center mt-10 font-poppins">Chargement...</div>;
  if (article === null) return <div className="text-red-500 text-center mt-10 font-poppins">Article introuvable.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 font-poppins">
      <h1 className="text-3xl font-bold">{article.titre}</h1>
      <img 
        className="w-full rounded-lg" 
        src={article.image_url || 'https://via.placeholder.com/800x400'} 
        alt={article.titre} 
      />
      <p className="text-gray-700">{article.contenu}</p>
      <div className="text-sm text-gray-500">
        Par {article.date_publication}, le {new Date(article.auteur).toLocaleDateString('fr-FR')}
      </div>

      {/* Formulaire commentaire */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Ajouter un commentaire</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Votre commentaire ici..."
        />
        <button
          onClick={handleCommentSubmit}
          className="mt-3 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors font-semibold"
        >
          Soumettre
        </button>
      </div>
    </div>
  );
};

export default ArticleDetail;
