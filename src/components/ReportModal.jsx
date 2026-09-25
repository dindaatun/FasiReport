import { useState } from "react";
import { NEXT_STATUS_MAP, STATUS_CONFIG } from "../types";
import { useAuth } from "../context/AuthContext";
import { dataService } from "../services/dataService";
import { ReportStatusBadge } from "./ReportStatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { ReportTimeline } from "./ReportTimeline";
import {
  X,
  MapPin,
  Tag,
  User,
  Mail,
  Calendar,
  ArrowRight,
  AlertCircle,
  Pencil,
  Trash2,
  CheckCircle,
  MessageSquare
} from "lucide-react";
export const ReportModal = ({
  report,
  isOpen,
  onClose,
  onReportUpdated,
  onOpenEdit
}) => {
  const { user, showToast } = useAuth();
  const [adminNote, setAdminNote] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedPhotoZoom, setSelectedPhotoZoom] = useState(null);
  if (!isOpen || !user) return null;
  const isAdmin = user.role === "admin";
  const isOwner = report.user_id === user.id;
  const canEditOrDelete = isOwner && report.status === "reported";
  const nextStatus = NEXT_STATUS_MAP[report.status];
  const handleAdvanceStatus = async () => {
    if (!isAdmin || !nextStatus) return;
    try {
      setIsUpdating(true);
      dataService.updateReportStatus(report.id, nextStatus, adminNote || null, user);
      showToast(
        `Status berhasil diperbarui menjadi ${STATUS_CONFIG[nextStatus].label}`,
        "success"
      );
      setAdminNote("");
      onReportUpdated();
    } catch (err) {
      showToast(err.message || "Gagal memperbarui status", "error");
    } finally {
      setIsUpdating(false);
    }
  };
  const handleDeleteReport = () => {
    try {
      setIsDeleting(true);
      dataService.deleteReport(report.id, user);
      showToast("Laporan berhasil dihapus.", "success");
      onReportUpdated();
      onClose();
    } catch (err) {
      showToast(err.message || "Gagal menghapus laporan", "error");
    } finally {
      setIsDeleting(false);
    }
  };
  const dateCreated = new Date(report.created_at).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 animate-in fade-in zoom-in-95 transition-colors">
        
        {
    /* Header */
  }
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                #{report.id}
              </span>
              <ReportStatusBadge status={report.status} />
              <PriorityBadge priority={report.priority} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">
              {report.facility?.name || "Fasilitas Tidak Diketahui"}
            </h3>
          </div>
          <button
    onClick={onClose}
    className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors"
  >
            <X className="w-5 h-5" />
          </button>
        </div>

        {
    /* Content Body */
  }
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {
    /* Metadata Grid */
  }
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Lokasi Fasilitas</div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">{report.facility?.location || "-"}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Tag className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Kategori Fasilitas</div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">{report.facility?.category || "-"}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Waktu Dilaporkan</div>
                <div className="font-semibold text-slate-800 dark:text-slate-200">{dateCreated}</div>
              </div>
            </div>

            {isAdmin && <>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 sm:col-span-2">
                  <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Identitas Pelapor</div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {report.user?.name || "Pelapor Tidak Diketahui"}
                      <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">
                        ({report.user?.email || "-"})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Role Pelapor</div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wide text-[11px]">
                      {report.user?.role || "employee"}
                    </div>
                  </div>
                </div>
              </>}
          </div>

          {
    /* Description */
  }
          <div>
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Deskripsi Kerusakan
            </h4>
            <div className="p-4 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
              {report.description}
            </div>
          </div>

          {
    /* Photo */
  }
          {report.photo && <div>
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Foto Dokumentasi Kerusakan
              </h4>
              <div className="relative inline-block border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden group">
                <img
    src={report.photo}
    alt="Dokumentasi Kerusakan"
    className="max-h-64 object-cover cursor-pointer hover:opacity-95 transition-opacity"
    onClick={() => setSelectedPhotoZoom(report.photo)}
  />
                <button
    type="button"
    onClick={() => setSelectedPhotoZoom(report.photo)}
    className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[11px] px-2.5 py-1 rounded-md backdrop-blur-xs hover:bg-slate-900 transition-colors"
  >
                  Perbesar Foto
                </button>
              </div>
            </div>}

          {
    /* Admin Note If Any */
  }
          {report.admin_note && <div className="p-4 bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 rounded-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-900 dark:text-sky-300 mb-1">
                <MessageSquare className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                Catatan Terkini Admin
              </div>
              <p className="text-sm text-sky-950 dark:text-sky-200">{report.admin_note}</p>
            </div>}

          {
    /* Timeline & Histories */
  }
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <ReportTimeline
    currentStatus={report.status}
    histories={report.status_histories}
  />
          </div>

          {
    /* ADMIN ACTION PANEL: Strict Sequential Progress */
  }
          {isAdmin && <div className="pt-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 -mx-6 -mb-6 p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Tindakan Admin & Pembaruan Status
                </h4>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Alur: Dilaporkan → Diproses → Diperbaiki → Selesai
                </span>
              </div>

              {nextStatus ? <div className="space-y-3 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Catatan Admin untuk Perubahan Status
                    </label>
                    <input
    type="text"
    value={adminNote}
    onChange={(e) => setAdminNote(e.target.value)}
    placeholder="Contoh: Sedang ditindaklanjuti oleh teknisi vendor pendingin..."
    className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
  />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      Status saat ini: <strong className="text-slate-900 dark:text-slate-200">{STATUS_CONFIG[report.status].label}</strong>
                      <span className="mx-2 text-slate-300 dark:text-slate-600">→</span>
                      Berikutnya: <strong className="text-teal-700 dark:text-teal-400">{STATUS_CONFIG[nextStatus].label}</strong>
                    </div>

                    <button
    onClick={handleAdvanceStatus}
    disabled={isUpdating}
    className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 rounded-lg shadow-sm shadow-teal-600/20 flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
  >
                      <span>Perbarui ke: {STATUS_CONFIG[nextStatus].label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div> : <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    Laporan ini telah mencapai status <strong>Selesai (Completed)</strong>. Seluruh proses perbaikan telah tuntas dan laporan terkunci.
                  </span>
                </div>}
            </div>}

          {
    /* EMPLOYEE ACTION PANEL: Edit/Delete if status is 'reported' */
  }
          {!isAdmin && isOwner && <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              {canEditOrDelete ? <div className="flex items-center justify-between p-3.5 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl">
                  <div className="text-xs text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Laporan berstatus <strong>Dilaporkan</strong> masih dapat diedit atau dibatalkan.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {onOpenEdit && <button
    onClick={() => {
      onClose();
      onOpenEdit(report);
    }}
    className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-1 transition-colors"
  >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit Laporan
                      </button>}
                    <button
    onClick={handleDeleteReport}
    disabled={isDeleting}
    className="px-3 py-1.5 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 rounded-lg flex items-center gap-1 transition-colors disabled:opacity-50"
  >
                      <Trash2 className="w-3.5 h-3.5" />
                      Hapus
                    </button>
                  </div>
                </div> : <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>
                    Laporan ini sudah dalam penanganan admin (status: <strong>{STATUS_CONFIG[report.status].label}</strong>). Laporan tidak dapat diedit atau dihapus sesuai aturan sistem.
                  </span>
                </div>}
            </div>}
        </div>

        {
    /* Footer */
  }
        <div className="flex items-center justify-end px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70">
          <button
    onClick={onClose}
    className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
  >
            Tutup
          </button>
        </div>
      </div>


      {
    /* Photo Zoom Modal */
  }
      {selectedPhotoZoom && <div
    className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm cursor-pointer"
    onClick={() => setSelectedPhotoZoom(null)}
  >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
    src={selectedPhotoZoom}
    alt="Foto Diperbesar"
    className="max-h-[85vh] max-w-full rounded-lg shadow-2xl object-contain"
  />
            <p className="text-center text-white text-xs mt-2 opacity-80">
              Klik di mana saja untuk menutup
            </p>
          </div>
        </div>}
    </div>;
};
