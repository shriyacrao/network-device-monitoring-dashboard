import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import StatusBadge from '../components/StatusBadge';
import DeviceFormModal from '../components/DeviceFormModal';
import { useAuth } from '../context/AuthContext';

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const { user } = useAuth();

  const fetchDevices = async () => {
    const { data } = await api.get('/devices');
    setDevices(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const openAddModal = () => {
    setEditingDevice(null);
    setModalOpen(true);
  };

  const openEditModal = (device) => {
    setEditingDevice(device);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    if (editingDevice) {
      await api.put(`/devices/${editingDevice._id}`, formData);
    } else {
      await api.post('/devices', formData);
    }
    setModalOpen(false);
    fetchDevices();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this device?')) return;
    await api.delete(`/devices/${id}`);
    fetchDevices();
  };

  if (loading) {
    return <div className="text-slate-400 p-8">Loading devices...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-slate-100 text-2xl font-semibold">Devices</h1>
        {user.role === 'admin' && (
          <button
            onClick={openAddModal}
            className="bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
          >
            + Add Device
          </button>
        )}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">IP Address</th>
              <th className="text-left px-4 py-3">Site</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Uptime</th>
              {user.role === 'admin' && <th className="text-left px-4 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device._id} className="border-t border-slate-800">
                <td className="px-4 py-3">
                  <Link to={`/devices/${device._id}`} className="text-sky-400 hover:underline">
                    {device.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-300">{device.type}</td>
                <td className="px-4 py-3 text-slate-300 font-mono text-xs">{device.ipAddress}</td>
                <td className="px-4 py-3 text-slate-300">{device.site}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={device.status} />
                </td>
                <td className="px-4 py-3 text-slate-300">{device.uptimePercentage}%</td>
                {user.role === 'admin' && (
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => openEditModal(device)}
                      className="text-slate-400 hover:text-slate-200 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(device._id)}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeviceFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingDevice}
      />
    </div>
  );
};

export default Devices;
