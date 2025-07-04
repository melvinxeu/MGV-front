import React, { useState, useEffect } from 'react';

const IdeasManager = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  const API_BASE_URL = 'http://localhost:3000';

  // Styles CSS inline
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '24px',
      fontFamily: 'Arial, sans-serif'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '32px'
    },
    error: {
      marginBottom: '24px',
      padding: '16px',
      backgroundColor: '#fee',
      border: '1px solid #fcc',
      color: '#c33',
      borderRadius: '4px'
    },
    button: {
      backgroundColor: '#8b5cf6',
      color: 'white',
      fontWeight: '600',
      padding: '8px 16px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    buttonHover: {
      backgroundColor: '#7c3aed'
    },
    buttonDisabled: {
      backgroundColor: '#d1d5db',
      cursor: 'not-allowed'
    },
    formContainer: {
      backgroundColor: '#f9f9f9',
      padding: '24px',
      borderRadius: '8px',
      marginBottom: '32px'
    },
    formTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#555',
      marginBottom: '16px'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
      marginBottom: '16px',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
      marginBottom: '16px',
      resize: 'vertical',
      boxSizing: 'border-box'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#555',
      marginBottom: '8px'
    },
    buttonAdd: {
      backgroundColor: '#3b82f6',
      color: 'white',
      fontWeight: '600',
      padding: '8px 16px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer'
    },
    ideasList: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#555',
      marginBottom: '16px'
    },
    loadingContainer: {
      textAlign: 'center',
      padding: '32px'
    },
    spinner: {
      width: '32px',
      height: '32px',
      border: '2px solid #f3f3f3',
      borderTop: '2px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 8px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '32px',
      color: '#666'
    },
    ideaCard: {
      border: '1px solid #e5e5e5',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: 'white',
      marginBottom: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    ideaHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '8px'
    },
    ideaTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#333',
      margin: '0'
    },
    statusBadge: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500'
    },
    statusPending: {
      backgroundColor: '#fef3c7',
      color: '#92400e'
    },
    statusApproved: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    statusRejected: {
      backgroundColor: '#fee2e2',
      color: '#991b1b'
    },
    ideaDescription: {
      color: '#666',
      marginBottom: '12px',
      lineHeight: '1.4'
    },
    ideaFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    ideaDate: {
      fontSize: '12px',
      color: '#999'
    },
    actionButtons: {
      display: 'flex',
      gap: '8px'
    },
    buttonApprove: {
      backgroundColor: '#10b981',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '12px'
    },
    buttonReject: {
      backgroundColor: '#ef4444',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '12px'
    }
  };

  // Récupérer toutes les idées
  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/ideas`);
      if (!response.ok) throw new Error('Erreur lors de la récupération des idées');
      const data = await response.json();
      setIdeas(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Générer des idées automatiquement
  const generateIdeas = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/ideas/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Erreur lors de la génération des idées');
      await fetchIdeas();
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Ajouter une idée manuelle
  const addIdea = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Le titre et la description sont obligatoires');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Erreur lors de l\'ajout de l\'idée');
      setFormData({ title: '', description: '' });
      await fetchIdeas();
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Approuver une idée
  const approveIdea = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/ideas/${id}/approve`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Erreur lors de l\'approbation');
      await fetchIdeas();
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Rejeter une idée
  const rejectIdea = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/ideas/${id}/reject`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Erreur lors du rejet');
      await fetchIdeas();
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Charger les idées au montage du composant
  useEffect(() => {
    fetchIdeas();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':
        return { ...styles.statusBadge, ...styles.statusApproved };
      case 'rejected':
        return { ...styles.statusBadge, ...styles.statusRejected };
      default:
        return { ...styles.statusBadge, ...styles.statusPending };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approuvée';
      case 'rejected':
        return 'Rejetée';
      default:
        return 'En attente';
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
     
      <h1 style={styles.title}>Gestionnaire d'Idées</h1>
     
      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      {/* Bouton génération automatique */}
      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={generateIdeas}
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {})
          }}
        >
          {loading ? 'Génération...' : 'Générer automatiquement 3 idées'}
        </button>
      </div>

      {/* Formulaire d'ajout d'idée */}
      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>Ajouter une idée</h2>
        <div>
          <label style={styles.label}>Titre</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            style={styles.input}
            placeholder="Titre de l'idée"
            disabled={loading}
          />
         
          <label style={styles.label}>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            style={styles.textarea}
            placeholder="Description détaillée de l'idée"
            disabled={loading}
          />
         
          <button
            onClick={addIdea}
            disabled={loading}
            style={{
              ...styles.buttonAdd,
              ...(loading ? styles.buttonDisabled : {})
            }}
          >
            {loading ? 'Ajout...' : 'Ajouter l\'idée'}
          </button>
        </div>
      </div>

      {/* Liste des idées */}
      <div>
        <h2 style={styles.ideasList}>
          Liste des idées ({ideas.length})
        </h2>
        {loading && ideas.length === 0 ? (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p>Chargement des idées...</p>
          </div>
        ) : ideas.length === 0 ? (
          <div style={styles.emptyState}>
            Aucune idée pour le moment. Ajoutez-en une ou générez-en automatiquement !
          </div>
        ) : (
          <div>
            {ideas.map((idea) => (
              <div key={idea.id} style={styles.ideaCard}>
                <div style={styles.ideaHeader}>
                  <h3 style={styles.ideaTitle}>{idea.title}</h3>
                  <span style={getStatusStyle(idea.status)}>
                    {getStatusText(idea.status)}
                  </span>
                </div>
                <p style={styles.ideaDescription}>{idea.description}</p>
                <div style={styles.ideaFooter}>
                  <span style={styles.ideaDate}>
                    Créée le {new Date(idea.created_at).toLocaleDateString('fr-FR')}
                  </span>
                  {idea.status === 'pending' && (
                    <div style={styles.actionButtons}>
                      <button
                        onClick={() => approveIdea(idea.id)}
                        disabled={loading}
                        style={{
                          ...styles.buttonApprove,
                          ...(loading ? styles.buttonDisabled : {})
                        }}
                      >
                        Approuver
                      </button>
                      <button
                        onClick={() => rejectIdea(idea.id)}
                        disabled={loading}
                        style={{
                          ...styles.buttonReject,
                          ...(loading ? styles.buttonDisabled : {})
                        }}
                      >
                        Rejeter
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeasManager;
