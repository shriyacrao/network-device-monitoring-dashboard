import React, { useState, useEffect } from 'react';

const emptyForm = {
  name: '',
  type: 'router',
  ipAddress: '',
  location: '',
  site: 'Main Office',
  notes: '',
};

const DeviceFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(initialData ? { ...emptyForm, ...initialData } : emptyForm);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-slate-100 text-lg font-semibold mb-4">
          {initialData ? 'Edit Device' : 'Add Device'}
        </h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-100"
              placeholder="Core-Router-01"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-100"
            >
              <option value="router">Router</option>
              <option value="switch">Switch</option>
              <option value="server">Server</option>
              <option value="firewall">Firewall</option>
              <option value="access-point">Access Point</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">IP Address</label>
            <input
              name="ipAddress"
              value={form.ipAddress}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-100"
              placeholder="10.0.0.1"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-100"
              placeholder="Server Room A"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Site</label>
            <input
              name="site"
              value={form.site}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-100"
              placeholder="HQ - Bengaluru"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Notes (optional)</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-100"
              rows={2}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-sky-600 hover:bg-sky-500 text-white rounded-md transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceFormModal;
