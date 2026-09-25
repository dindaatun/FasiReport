export const STATUS_CONFIG = {
  reported: {
    label: "Dilaporkan",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    step: 1,
    description: "Laporan telah diterima sistem dan menunggu ditinjau admin."
  },
  processing: {
    label: "Diproses",
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
    step: 2,
    description: "Petugas sedang menindaklanjuti atau menjadwalkan perbaikan."
  },
  repaired: {
    label: "Diperbaiki",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    step: 3,
    description: "Fasilitas dalam pengerjaan atau telah selesai tindakan fisik."
  },
  completed: {
    label: "Selesai",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    step: 4,
    description: "Fasilitas telah diperiksa ulang dan laporan resmi ditutup."
  }
};
export const PRIORITY_CONFIG = {
  low: {
    label: "Rendah",
    bg: "bg-slate-100",
    text: "text-slate-700",
    dot: "bg-slate-400"
  },
  medium: {
    label: "Sedang",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500"
  },
  high: {
    label: "Tinggi",
    bg: "bg-rose-50",
    text: "text-rose-700",
    dot: "bg-rose-600"
  }
};
export const NEXT_STATUS_MAP = {
  reported: "processing",
  processing: "repaired",
  repaired: "completed",
  completed: null
};
