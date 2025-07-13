import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
type Video = {
  id: number;
  titre: string;
  duree: string;
  url_video: string;
};

const VideoDetail: React.FC = () => {
  const { id } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<Video>(`http://localhost:8000/api/videos/${id}/`)
      .then(res => {
        setVideo(res.data);
      })
      .catch(err => {
        console.error(err);
        setVideo(null);
      })
      .then(() => setLoading(false));
  }, [id]);

  function getYoutubeEmbedUrl(youtubeUrl: string): string {
    try {
      const url = new URL(youtubeUrl);
      const videoId = url.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : youtubeUrl;
    } catch  {
      return youtubeUrl;
    }
  }

  if (loading) return <div className="text-center mt-10 font-poppins">Chargement...</div>;
  if (!video) return <div className="text-center mt-10 text-red-500 font-poppins">Vidéo non trouvée.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto font-poppins">
      <h3 className="mt-3 font-semibold text-gray-800 font-poppins text-2xl mb-4">
        {video.titre}
      </h3>

      <div className="aspect-w-16 aspect-h-9 mb-6">
        <iframe
          src={getYoutubeEmbedUrl(video.url_video)}
          className="w-full h-96 rounded-xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video.titre}
        ></iframe>
      </div>

      <p className="text-sm text-gray-600">Durée : {video.duree}</p>
    </div>
  );
};

export default VideoDetail;
