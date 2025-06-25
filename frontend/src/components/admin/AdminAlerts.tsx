import React, { useState } from 'react';
import { Plus, Filter, Edit, Trash2, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { mockAlerts } from '../../data/mockData';
import { Alert } from '../../types';

export const AdminAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'active') return alert.active;
    if (filter === 'inactive') return !alert.active;
    return true;
  });

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'red': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'orange': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'green': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getAlertBadgeColor = (level: string) => {
    switch (level) {
      case 'red': return 'bg-red-100 text-red-800';
      case 'orange': return 'bg-orange-100 text-orange-800';
      case 'green': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleAlertStatus = (id: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette alerte ?')) {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 font-poppins mb-2">
              Gestion des alertes
            </h1>
            <p className="text-gray-600 font-poppins">
              Créez et gérez les alertes climatiques
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors font-poppins"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle alerte
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700 font-poppins">Filtrer par :</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 font-poppins focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Toutes les alertes</option>
              <option value="active">Alertes actives</option>
              <option value="inactive">Alertes inactives</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-4 text-sm font-poppins">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Normale ({alerts.filter(a => a.level === 'green').length})</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              <span>Attention ({alerts.filter(a => a.level === 'orange').length})</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span>Critique ({alerts.filter(a => a.level === 'red').length})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-poppins">
                  Alerte
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-poppins">
                  Niveau
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-poppins">
                  Zone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-poppins">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-poppins">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-poppins">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getAlertIcon(alert.level)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 font-poppins">
                          {alert.title}
                        </div>
                        <div className="text-sm text-gray-500 font-poppins max-w-xs">
                          {alert.message.substring(0, 80)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full font-poppins ${getAlertBadgeColor(alert.level)}`}>
                      {alert.level === 'green' && 'Normale'}
                      {alert.level === 'orange' && 'Attention'}
                      {alert.level === 'red' && 'Critique'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-poppins">
                    {alert.zone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-poppins">
                    {alert.date.toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleAlertStatus(alert.id)}
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full font-poppins transition-colors ${
                        alert.active
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {alert.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-primary hover:text-primary/80 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteAlert(alert.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Alert Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 font-poppins mb-4">
              Créer une nouvelle alerte
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                  Titre de l'alerte
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 font-poppins focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ex: Alerte canicule"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                  Niveau d'alerte
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 font-poppins focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="green">Normale</option>
                  <option value="orange">Attention</option>
                  <option value="red">Critique</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                  Zone concernée
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 font-poppins focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ex: Paris Centre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                  Message d'alerte
                </label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 font-poppins focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Décrivez l'alerte..."
                ></textarea>
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
                  Créer l'alerte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};