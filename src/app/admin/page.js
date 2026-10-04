'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Megaphone,
  FileText,
  ImageIcon,
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
  Clock,
  Link as LinkIcon,
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

  // Galeri state
  const [galeriList, setGaleriList] = useState([]);
  const [loadingG, setLoadingG] = useState(true);
  const [showFormG, setShowFormG] = useState(false);
  const [editingIdG, setEditingIdG] = useState(null);
  const [formG, setFormG] = useState({
    judul: '',
    deskripsi: '',
    gambar_url: '',
  });
  const [savingG, setSavingG] = useState(false);

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

  // Fetch data
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

  const fetchGaleri = useCallback(async () => {
    setLoadingG(true);
    try {
      const res = await fetch('/api/galeri');
      const data = await res.json();
      setGaleriList(Array.isArray(data) ? data : []);
    } catch {
      setGaleriList([]);
    }
    setLoadingG(false);
  }, []);

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
      fetchGaleri();
      fetchLaporan();
    }
  }, [user, fetchPengumuman, fetchGaleri, fetchLaporan]);

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
      const url = editingId ? `/api/pengumuman/${editingId}` : '/api/pengumuman';
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

  // Galeri CRUD
  const resetFormG = () => {
    setFormG({ judul: '', deskripsi: '', gambar_url: '' });
    setEditingIdG(null);
    setShowFormG(false);
  };

  const handleEditG = (item) => {
    setFormG({
      judul: item.judul,
      deskripsi: item.deskripsi || '',
      gambar_url: item.gambar_url,
    });
    setEditingIdG(item.id);
    setShowFormG(true);
  };

  const handleSaveG = async (e) => {
    e.preventDefault();
    setSavingG(true);
    try {
      const url = editingIdG ? `/api/galeri/${editingIdG}` : '/api/galeri';
      const method = editingIdG ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formG),
      });
      if (!res.ok) throw new Error();
      showToast('success', editingIdG ? 'Galeri diperbarui' : 'Galeri ditambahkan');
      resetFormG();
      fetchGaleri();
    } catch {
      showToast('error', 'Gagal menyimpan galeri');
    }
    setSavingG(false);
  };

  const handleDeleteG = async (id) => {
    if (!confirm('Hapus foto dari galeri?')) return;
    try {
      await fetch(`/api/galeri/${id}`, { method: 'DELETE' });
      showToast('success', 'Foto dihapus');
      fetchGaleri();
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
    <div className="min-h-screen bg-sage-50 pt-20 pb-20">
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
          <div className="bg-white rounded-xl p-4 border border-sage-100/50 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Megaphone className="w-4 h-4 text-sage-400" />
              <span className="text-sage-500 text-xs font-medium">Pengumuman</span>
            </div>
            <p className="text-2xl font-bold text-sage-900">{pengumumanList.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-sage-100/50 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <ImageIcon className="w-4 h-4 text-sage-400" />
              <span className="text-sage-500 text-xs font-medium">Foto Galeri</span>
            </div>
            <p className="text-2xl font-bold text-sage-900">{galeriList.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-sage-100/50 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-sage-500 text-xs font-medium">Laporan Baru</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {laporanList.filter((l) => l.status === 'Diterima').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-sage-100/50 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sage-500 text-xs font-medium">Laporan Selesai</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {laporanList.filter((l) => l.status === 'Selesai').length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white rounded-xl p-1.5 border border-sage-100/50 w-fit shadow-sm">
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
            onClick={() => setTab('galeri')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              tab === 'galeri'
                ? 'bg-sage-500 text-white'
                : 'text-sage-600 hover:bg-sage-50'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Galeri
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
          <div className="animate-in">
            {/* Add Button */}
            {!showForm && (
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="btn-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold mb-6 cursor-pointer shadow-sm hover:shadow-md"
              >
                <span className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Buat Pengumuman Baru
                </span>
              </button>
            )}

            {/* Form */}
            {showForm && (
              <div className="bg-white rounded-xl p-6 border border-sage-100/50 mb-6 shadow-sm">
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
              <div className="text-center py-12 bg-white rounded-xl border border-sage-100/50 shadow-sm">
                <Megaphone className="w-10 h-10 text-sage-300 mx-auto mb-3" />
                <p className="text-sage-500 text-sm">Belum ada pengumuman</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pengumumanList.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-xl p-4 border shadow-sm transition-shadow hover:shadow-md flex items-start justify-between gap-4 ${
                      item.is_pinned
                        ? 'border-sage-300 ring-1 ring-sage-200'
                        : 'border-sage-100/50'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {item.is_pinned && (
                          <Pin className="w-3 h-3 text-sage-500" />
                        )}
                        <span className="text-[10px] uppercase tracking-wider font-bold text-sage-500 bg-sage-50 px-2 py-0.5 rounded-full border border-sage-100">
                          {item.kategori}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sage-900 text-sm">
                        {item.judul}
                      </h4>
                      <p className="text-sage-500 text-xs mt-1 line-clamp-2">
                        {item.isi}
                      </p>
                      <p className="text-sage-400 text-xs mt-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
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

        {/* ─── GALERI TAB ─── */}
        {tab === 'galeri' && (
          <div className="animate-in">
            {/* Add Button */}
            {!showFormG && (
              <button
                onClick={() => {
                  resetFormG();
                  setShowFormG(true);
                }}
                className="btn-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold mb-6 cursor-pointer shadow-sm hover:shadow-md"
              >
                <span className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Tambah Foto ke Galeri
                </span>
              </button>
            )}

            {/* Form */}
            {showFormG && (
              <div className="bg-white rounded-xl p-6 border border-sage-100/50 mb-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sage-900">
                    {editingIdG ? 'Edit Foto' : 'Tambah Foto Baru'}
                  </h3>
                  <button
                    onClick={resetFormG}
                    className="text-sage-400 hover:text-sage-600 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleSaveG} className="space-y-4">
                  <div>
                    <label className="block text-sage-700 text-sm font-medium mb-1.5">
                      URL Gambar * (Link langsung dari web, google drive, dsb)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LinkIcon className="h-4 w-4 text-sage-400" />
                      </div>
                      <input
                        type="url"
                        value={formG.gambar_url}
                        onChange={(e) =>
                          setFormG({ ...formG, gambar_url: e.target.value })
                        }
                        className="form-input pl-9"
                        placeholder="https://..."
                        required
                      />
                    </div>
                    {formG.gambar_url && (
                      <div className="mt-2 w-32 h-20 rounded-lg overflow-hidden border border-sage-200 bg-sage-50">
                        <img 
                          src={formG.gambar_url} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sage-700 text-sm font-medium mb-1.5">
                      Judul Foto *
                    </label>
                    <input
                      type="text"
                      value={formG.judul}
                      onChange={(e) =>
                        setFormG({ ...formG, judul: e.target.value })
                      }
                      className="form-input"
                      placeholder="Contoh: Kerja Bakti Desa"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sage-700 text-sm font-medium mb-1.5">
                      Deskripsi Singkat (Opsional)
                    </label>
                    <textarea
                      value={formG.deskripsi}
                      onChange={(e) =>
                        setFormG({ ...formG, deskripsi: e.target.value })
                      }
                      className="form-textarea min-h-[80px]"
                      rows={3}
                      placeholder="Deskripsi kegiatan di foto..."
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={savingG}
                      className="btn-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        {savingG ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                        {editingIdG ? 'Perbarui' : 'Simpan'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={resetFormG}
                      className="px-6 py-2.5 rounded-xl text-sm font-medium text-sage-600 border border-sage-200 hover:bg-sage-50 transition-colors cursor-pointer"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List */}
            {loadingG ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-5 h-5 text-sage-400 animate-spin" />
              </div>
            ) : galeriList.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-sage-100/50 shadow-sm">
                <ImageIcon className="w-10 h-10 text-sage-300 mx-auto mb-3" />
                <p className="text-sage-500 text-sm">Belum ada foto di galeri</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {galeriList.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl overflow-hidden border border-sage-100/50 shadow-sm transition-shadow hover:shadow-md flex flex-col"
                  >
                    <div className="relative w-full aspect-video bg-sage-100 border-b border-sage-100/50">
                      <img 
                        src={item.gambar_url} 
                        alt={item.judul}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/400x300/e8e6d8/8e9e70?text=Error';
                        }}
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h4 className="font-semibold text-sage-900 text-sm mb-1 line-clamp-1">
                        {item.judul}
                      </h4>
                      {item.deskripsi && (
                        <p className="text-sage-500 text-xs mb-3 line-clamp-2 flex-1">
                          {item.deskripsi}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-sage-100/50">
                        <span className="text-sage-400 text-xs flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(item.created_at)}
                        </span>
                        <div className="flex items-center shrink-0">
                          <button
                            onClick={() => handleEditG(item)}
                            className="p-1.5 text-sage-400 hover:text-sage-600 hover:bg-sage-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteG(item.id)}
                            className="p-1.5 text-sage-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── LAPORAN TAB ─── */}
        {tab === 'laporan' && (
          <div className="animate-in">
            {loadingL ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-5 h-5 text-sage-400 animate-spin" />
              </div>
            ) : laporanList.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-sage-100/50 shadow-sm">
                <FileText className="w-10 h-10 text-sage-300 mx-auto mb-3" />
                <p className="text-sage-500 text-sm">
                  Belum ada laporan masuk
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {laporanList.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-5 border border-sage-100/50 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              statusColors[item.status] || statusColors.Diterima
                            }`}
                          >
                            {item.status}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-sage-500 bg-sage-50 border border-sage-100 px-2.5 py-0.5 rounded-full">
                            {item.kategori}
                          </span>
                        </div>
                        <h4 className="font-semibold text-sage-900 text-base">
                          {item.judul}
                        </h4>
                      </div>
                      <span className="text-sage-400 text-xs flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3" />
                        {formatDate(item.created_at)}
                      </span>
                    </div>
                    <div className="bg-sage-50/50 rounded-lg p-3.5 mb-4 border border-sage-100/30">
                      <p className="text-sage-700 text-sm leading-relaxed whitespace-pre-line">
                        "{item.deskripsi}"
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-sage-600 bg-white rounded-lg p-3 border border-sage-100">
                      <span className="flex items-center gap-1.5">
                        <span className="font-semibold text-sage-900">Pelapor:</span> 
                        {item.nama_pelapor}
                      </span>
                      {item.no_telepon && (
                        <span className="flex items-center gap-1.5">
                          <span className="font-semibold text-sage-900">Telp:</span> 
                          {item.no_telepon}
                        </span>
                      )}
                      {item.email && (
                        <span className="flex items-center gap-1.5">
                          <span className="font-semibold text-sage-900">Email:</span> 
                          {item.email}
                        </span>
                      )}
                      {item.lokasi_kejadian && (
                        <span className="flex items-center gap-1.5">
                          <span className="font-semibold text-sage-900">Lokasi:</span> 
                          {item.lokasi_kejadian}
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
