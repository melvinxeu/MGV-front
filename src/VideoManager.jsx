import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, Play, Pause, Volume2 } from 'lucide-react';

const VideosManager = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [schedulingVideo, setSchedulingVideo] = useState(null);
  const [scheduledTime, setScheduledTime] = useState('');

  // Données mockées pour simulation
  const mockVideos = [
    {
      id: 1,
      title: "Comment faire des pâtes carbonara",
      description: "Recette traditionnelle italienne avec les vrais ingrédients",
      file_path: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      status: "pending",
      scheduled_time: null,
      created_at: "2025-07-04T10:30:00Z"
    },
    {
      id: 2,
      title: "Top 5 des destinations de vacances",
      description: "Découvrez les plus belles destinations pour vos prochaines vacances",
      file_path: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      status: "approved",
      scheduled_time: null,
      created_at: "2025-07-03T14:15:00Z"
    },
    {
      id: 3,
      title: "Tutoriel React hooks",
      description: "Apprendre les hooks React avec des exemples pratiques",
      file_path: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      status: "scheduled",
      scheduled_time: "2025-07-06T18:00:00Z",
      created_at: "2025-07-02T09:20:00Z"
    },
    {
      id: 4,
      title: "Exercices de yoga matinal",
      description: "Routine de 15 minutes pour bien commencer la journée",
      file_path: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      status: "rejected",
      scheduled_time: null,
      created_at: "2025-07-01T16:45:00Z"
    },
    {
      id: 5,
      title: "Jardinage bio pour débutants",
      description: "Les bases du jardinage biologique à la maison",
      file_path: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      status: "published",
      scheduled_time: "2025-07-05T12:00:00Z",
      created_at: "2025-06-30T11:30:00Z"
    }
  ];

  // Simulation d'appel API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        // Simulation d'un délai d'API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVideos(mockVideos);
      } catch (err) {
        setError('Erreur lors du chargement des vidéos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Fonction pour approuver une vidéo
  const approveVideo = async (id) => {
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 500));
     
      setVideos(prevVideos =>
        prevVideos.map(video =>
          video.id === id ? { ...video, status: 'approved' } : video
        )
      );
     
      console.log(`POST /videos/${id}/approve`);
    } catch (err) {
      setError('Erreur lors de l\'approbation');
    }
  };

  // Fonction pour rejeter une vidéo
  const rejectVideo = async (id) => {
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 500));
     
      setVideos(prevVideos =>
        prevVideos.map(video =>
          video.id === id ? { ...video, status: 'rejected' } : video
        )
      );
     
      console.log(`POST /videos/${id}/reject`);
    } catch (err) {
      setError('Erreur lors du rejet');
    }
  };

  // Fonction pour programmer une vidéo
  const scheduleVideo = async (id, scheduledTime) => {
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 500));
     
      setVideos(prevVideos =>
        prevVideos.map(video =>
          video.id === id
            ? { ...video, status: 'scheduled', scheduled_time: scheduledTime }
            : video
        )
      );
     
      console.log(`POST /videos/${id}/schedule`, { scheduled_time: scheduledTime });
      setSchedulingVideo(null);
      setScheduledTime('');
    } catch (err) {
      setError('Erreur lors de la programmation');
    }
  };

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Fonction pour obtenir le style du statut
  const getStatusStyle = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300',
      scheduled: 'bg-blue-100 text-blue-800 border-blue-300',
      published: 'bg-purple-100 text-purple-800 border-purple-300'
    };
    return styles[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  // Fonction pour obtenir l'icône du statut
  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'scheduled':
        return <Calendar className="w-4 h-4" />;
      case 'published':
        return <Play className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <XCircle className="w-5 h-5 text-red-500 mr-2" />
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gestion des Vidéos
        </h1>
        <p className="text-gray-600">
          Gérez vos vidéos générées : approuvez, rejetez ou programmez leur publication
        </p>
      </div>

      <div className="grid gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              {/* En-tête de la vidéo */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{video.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Créé le {formatDate(video.created_at)}</span>
                    {video.scheduled_time && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Programmé pour le {formatDate(video.scheduled_time)}
                      </span>
                    )}
                  </div>
                </div>
               
                {/* Badge de statut */}
                <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-2 ${getStatusStyle(video.status)}`}>
                  {getStatusIcon(video.status)}
                  {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                </div>
              </div>

              {/* Lecteur vidéo */}
              <div className="mb-6">
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <video
                    className="w-full h-64 object-cover"
                    controls
                    preload="metadata"
                  >
                    <source src={video.file_path} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Chemin: {video.file_path}
                </p>
              </div>

              {/* Actions selon le statut */}
              <div className="flex gap-3">
                {video.status === 'pending' && (
                  <>
                    <button
                      onClick={() => approveVideo(video.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approuver
                    </button>
                    <button
                      onClick={() => rejectVideo(video.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Rejeter
                    </button>
                  </>
                )}

                {video.status === 'approved' && (
                  <div className="flex items-center gap-3">
                    {schedulingVideo === video.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="datetime-local"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min={new Date().toISOString().slice(0, 16)}
                        />
                        <button
                          onClick={() => scheduleVideo(video.id, scheduledTime)}
                          disabled={!scheduledTime}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Confirmer
                        </button>
                        <button
                          onClick={() => {
                            setSchedulingVideo(null);
                            setScheduledTime('');
                          }}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          Annuler
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSchedulingVideo(video.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Calendar className="w-4 h-4" />
                        Programmer la publication
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center py-12">
          <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune vidéo trouvée
          </h3>
          <p className="text-gray-600">
            Les vidéos générées apparaîtront ici pour validation
          </p>
        </div>
      )}
    </div>
  );
};

export default VideosManager;
