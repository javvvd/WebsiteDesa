'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { X, LogIn, Loader2, AlertCircle } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(username, password);
      setUsername('');
      setPassword('');
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 animate-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sage-400 hover:text-sage-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-sage-400/10 flex items-center justify-center mx-auto mb-3">
            <LogIn className="w-6 h-6 text-sage-500" />
          </div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-sage-900">
            Login Admin
          </h2>
          <p className="text-sage-500 text-xs mt-1">
            Masuk untuk mengelola portal kelurahan
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sage-700 text-sm font-medium mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Masukkan username"
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sage-700 text-sm font-medium mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Masukkan password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Masuk
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
