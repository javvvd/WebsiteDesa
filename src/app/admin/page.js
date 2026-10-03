'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Megaphone,
  FileText,
  Plus,
  Edit3,
  Trash2,
  Pin,
  PinOff,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  LogOut,
  Calendar,
  Eye,
  Clock,
} from 'lucide-react';

const kategoriOptions = ['Umum', 'Penting', 'Kegiatan', 'Pembangunan', 'Kesehatan', 'Pendidikan'];

const statusColors = {
  Diterima: 'bg-blue-100 text-blue-700',
  Diproses: 'bg-amber-100 text-amber-700',
  Selesai: 'bg-green-100 text-green-700',
  Ditolak: 'bg-red-100 text-red-700',
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AdminPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState('pengumuman');

  // Pengumuman state
  const [pengumumanList, setPengumumanList] = useState([]);
  const [loadingP, setLoadingP] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formP, setFormP] = useState({
    judul: '',
    isi: '',
    kategori: 'Umum',
    is_pinned: false,
  });
  const [savingP, setSavingP] = useState(false);

  // Laporan state
  const [laporanList, setLaporanList] = useState([]);
  const [loadingL, setLoadingL] = useState(true);

  // Toast
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [authLoading, user, router]);

  // Fetch pengumuman
  const fetchPengumuman = useCallback(async () => {
    setLoadingP(true);
    try {
      const res = await fetch('/api/pengumuman');
      const data = await res.json();
      setPengumumanList(Array.isArray(data) ? data : []);
    } catch {
      setPengumumanList([]);
    }
    setLoadingP(false);
  }, []);

  // Fetch laporan
  const fetchLaporan = useCallback(async () => {
    setLoadingL(true);
    try {
      const res = await fetch('/api/laporan');
      if (res.ok) {
        const data = await res.json();
        setLaporanList(Array.isArray(data) ? data : []);
      }
    } catch {
      setLaporanList([]);
    }
    setLoadingL(false);
  }, []);

  useEffect(() => {
    if (user) {
      fetchPengumuman();
      fetchLaporan();
    }
  }, [user, fetchPengumuman, fetchLaporan]);

  // Pengumuman CRUD
  const resetForm = () => {
    setFormP({ judul: '', isi: '', kategori: 'Umum', is_pinned: false });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEditP = (item) => {
    setFormP({
      judul: item.judul,
      isi: item.isi,
      kategori: item.kategori,
      is_pinned: item.is_pinned,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSaveP = async (e) => {
    e.preventDefault();
    setSavingP(true);
    try {
      const url = editingId
        ? `/api/pengumuman/${editingId}`
        : '/api/pengumuman';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formP),
      });
      if (!res.ok) throw new Error();
      showToast('success', editingId ? 'Pengumuman diperbarui' : 'Pengumuman dibuat');
      resetForm();
      fetchPengumuman();
    } catch {
      showToast('error', 'Gagal menyimpan pengumuman');
    }
    setSavingP(false);
  };

  const handleDeleteP = async (id) => {
    if (!confirm('Hapus pengumuman ini?')) return;
    try {
      await fetch(`/api/pengumuman/${id}`, { method: 'DELETE' });
      showToast('success', 'Pengumuman dihapus');
      fetchPengumuman();
    } catch {
      showToast('error', 'Gagal menghapus');
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-6 h-6 text-sage-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sage-50 pt-20">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 z-[80] toast">
          <div
            className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${
              toast.type === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {toast.message}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-sage-900">
              Dashboard Admin
            </h1>
            <p className="text-sage-500 text-sm mt-1">
              Selamat datang, {user.nama}
            </p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sage-500 hover:text-red-600 text-sm font-medium transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-sage-100/50">
            <div className="flex items-center gap-2 mb-2">
              <Megaphone className="w-4 h-4 text-sage-400" />
              <span className="text-sage-500 text-xs font-medium">Pengumuman</span>
            </div>
            <p className="text-2xl font-bold text-sage-900">{pengumumanList.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-sage-100/50">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-sage-400" />
              <span className="text-sage-500 text-xs font-medium">Total Laporan</span>
            </div>
            <p className="text-2xl font-bold text-sage-900">{laporanList.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-sage-100/50">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-sage-500 text-xs font-medium">Laporan Baru</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {laporanList.filter((l) => l.status === 'Diterima').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-sage-100/50">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sage-500 text-xs font-medium">Selesai</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {laporanList.filter((l) => l.status === 'Selesai').length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 border border-sage-100/50 w-fit">
          <button
            onClick={() => setTab('pengumuman')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              tab === 'pengumuman'
                ? 'bg-sage-500 text-white'
                : 'text-sage-600 hover:bg-sage-50'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            Pengumuman
          </button>
          <button
            onClick={() => setTab('laporan')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              tab === 'laporan'
                ? 'bg-sage-500 text-white'
                : 'text-sage-600 hover:bg-sage-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            Laporan Warga
          </button>
        </div>

        {/* ─── PENGUMUMAN TAB ─── */}
        {tab === 'pengumuman' && (
          <div>
            {/* Add Button */}
            {!showForm && (
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="btn-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold mb-6 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Buat Pengumuman Baru
                </span>
              </button>
            )}

            {/* Form */}
            {showForm && (
              <div className="bg-white rounded-xl p-6 border border-sage-100/50 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sage-900">
                    {editingId ? 'Edit Pengumuman' : 'Buat Pengumuman Baru'}
                  </h3>
                  <button
                    onClick={resetForm}
                    className="text-sage-400 hover:text-sage-600 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleSaveP} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sage-700 text-sm font-medium mb-1.5">
                        Judul *
                      </label>
                      <input
                        type="text"
                        value={formP.judul}
                        onChange={(e) =>
                          setFormP({ ...formP, judul: e.target.value })
                        }
                        className="form-input"
                        placeholder="Judul pengumuman"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sage-700 text-sm font-medium mb-1.5">
                        Kategori
                      </label>
                      <select
                        value={formP.kategori}
                        onChange={(e) =>
                          setFormP({ ...formP, kategori: e.target.value })
                        }
                        className="form-select"
                      >
                        {kategoriOptions.map((k) => (
                          <option key={k} value={k}>
                            {k}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sage-700 text-sm font-medium mb-1.5">
                      Isi Pengumuman *
                    </label>
                    <textarea
                      value={formP.isi}
                      onChange={(e) =>
                        setFormP({ ...formP, isi: e.target.value })
                      }
                      className="form-textarea"
                      rows={5}
                      placeholder="Tulis isi pengumuman..."
                      required
                    />
                  </div>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formP.is_pinned}
                        onChange={(e) =>
                          setFormP({ ...formP, is_pinned: e.target.checked })
                        }
                        className="w-4 h-4 rounded border-sage-300 text-sage-500 focus:ring-sage-400"
                      />
                      <span className="text-sage-700 text-sm">
                        Sematkan di atas
                      </span>
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={savingP}
                      className="btn-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        {savingP ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                        {editingId ? 'Perbarui' : 'Simpan'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-2.5 rounded-xl text-sm font-medium text-sage-600 border border-sage-200 hover:bg-sage-50 transition-colors cursor-pointer"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List */}
            {loadingP ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-5 h-5 text-sage-400 animate-spin" />
              </div>
            ) : pengumumanList.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-sage-100/50">
                <Megaphone className="w-10 h-10 text-sage-300 mx-auto mb-3" />
                <p className="text-sage-500 text-sm">Belum ada pengumuman</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pengumumanList.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-xl p-4 border flex items-start justify-between gap-4 ${
                      item.is_pinned
                        ? 'border-sage-300'
                        : 'border-sage-100/50'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {item.is_pinned && (
                          <Pin className="w-3 h-3 text-sage-500" />
                        )}
                        <span className="text-xs font-medium text-sage-400 bg-sage-50 px-2 py-0.5 rounded-full">
                          {item.kategori}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sage-900 text-sm">
                        {item.judul}
                      </h4>
                      <p className="text-sage-500 text-xs mt-1 line-clamp-2">
                        {item.isi}
                      </p>
                      <p className="text-sage-400 text-xs mt-2">
                        {formatDate(item.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleEditP(item)}
                        className="p-2 text-sage-400 hover:text-sage-600 hover:bg-sage-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteP(item.id)}
                        className="p-2 text-sage-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── LAPORAN TAB ─── */}
        {tab === 'laporan' && (
          <div>
            {loadingL ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-5 h-5 text-sage-400 animate-spin" />
              </div>
            ) : laporanList.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-sage-100/50">
                <FileText className="w-10 h-10 text-sage-300 mx-auto mb-3" />
                <p className="text-sage-500 text-sm">
                  Belum ada laporan masuk
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {laporanList.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-4 md:p-5 border border-sage-100/50"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              statusColors[item.status] || statusColors.Diterima
                            }`}
                          >
                            {item.status}
                          </span>
                          <span className="text-xs text-sage-400 bg-sage-50 px-2 py-0.5 rounded-full">
                            {item.kategori}
                          </span>
                        </div>
                        <h4 className="font-semibold text-sage-900 text-sm">
                          {item.judul}
                        </h4>
                      </div>
                      <span className="text-sage-400 text-xs whitespace-nowrap">
                        {formatDate(item.created_at)}
                      </span>
                    </div>
                    <p className="text-sage-600 text-sm mb-3 leading-relaxed">
                      {item.deskripsi}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-sage-500">
                      <span>
                        <strong>Pelapor:</strong> {item.nama_pelapor}
                      </span>
                      {item.no_telepon && (
                        <span>
                          <strong>Telp:</strong> {item.no_telepon}
                        </span>
                      )}
                      {item.email && (
                        <span>
                          <strong>Email:</strong> {item.email}
                        </span>
                      )}
                      {item.lokasi_kejadian && (
                        <span>
                          <strong>Lokasi:</strong> {item.lokasi_kejadian}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
