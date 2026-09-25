import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { dataService } from "../services/dataService";
import { X, CalendarDays, AlertCircle } from "lucide-react";
export const MaintenanceModal = ({
  isOpen,
  onClose,
  onSuccess,
  itemToEdit,
  facilities
}) => {
  const { user, showToast } = useAuth();
  const [selectedFacilityOption, setSelectedFacilityOption] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [pic, setPic] = useState("");
  const [status, setStatus] = useState("upcoming");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    if (isOpen) {
      if (itemToEdit) {
        setFacilityName(itemToEdit.facility);
        setLocation(itemToEdit.location);
        setDate(itemToEdit.date);
        setType(itemToEdit.type);
        setPic(itemToEdit.pic);
        setStatus(itemToEdit.status);
        const match = facilities.find((f) => f.name.toLowerCase() === itemToEdit.facility.toLowerCase());
        if (match) {
          setSelectedFacilityOption(match.id.toString());
        } else {
          setSelectedFacilityOption("custom");
        }
      } else {
        setSelectedFacilityOption("");
        setFacilityName("");
        setLocation("");
        setDate((/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }));
        setType("");
        setPic("");
        setStatus("upcoming");
      }
      setErrorMsg(null);
    }
  }, [isOpen, itemToEdit, facilities]);
  if (!isOpen || !user) return null;
  const isEditing = !!itemToEdit;
  const handleFacilitySelect = (val) => {
    setSelectedFacilityOption(val);
    if (val === "custom") {
      setFacilityName("");
      setLocation("");
    } else if (val) {
      const found = facilities.find((f) => f.id.toString() === val);
      if (found) {
        setFacilityName(found.name);
        setLocation(found.location);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);
    const cleanFacility = facilityName.trim();
    const cleanLocation = location.trim();
    const cleanDate = date.trim();
    const cleanType = type.trim();
    const cleanPic = pic.trim();
    if (!cleanFacility || !cleanLocation || !cleanDate || !cleanType || !cleanPic) {
      setErrorMsg("Semua kolom formulir jadwal servis wajib diisi.");
      return;
    }
    try {
      setIsSubmitting(true);
      if (isEditing && itemToEdit) {
        dataService.updateMaintenanceSchedule(itemToEdit.id, {
          facility: cleanFacility,
          location: cleanLocation,
          date: cleanDate,
          type: cleanType,
          pic: cleanPic,
          status
        });
        showToast(`Jadwal servis '${cleanFacility}' berhasil diperbarui.`, "success");
      } else {
        dataService.createMaintenanceSchedule({
          facility: cleanFacility,
          location: cleanLocation,
          date: cleanDate,
          type: cleanType,
          pic: cleanPic,
          status
        });
        showToast(`Jadwal servis baru '${cleanFacility}' berhasil ditambahkan.`, "success");
      }
      onSuccess();
      onClose();
    } catch (err) {
      setErrorMsg(err.message || "Gagal menyimpan jadwal servis.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 animate-in fade-in zoom-in-95 transition-colors">
        
        {
    /* Header */
  }
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 flex items-center justify-center">
              <CalendarDays className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                {isEditing ? "Edit Jadwal Servis & Pemeliharaan" : "Tambah Jadwal Servis Baru"}
              </h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                {isEditing ? "Perbarui informasi agenda teknisi atau vendor" : "Buat agenda servis berkala fasilitas gedung"}
              </p>
            </div>
          </div>

          <button
    onClick={onClose}
    className="p-1.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
  >
            <X className="w-5 h-5" />
          </button>
        </div>

        {
    /* Body */
  }
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {errorMsg && <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>}

          {
    /* Facility Selection / Custom */
  }
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Pilih Dari Inventaris Fasilitas
            </label>
            <select
    value={selectedFacilityOption}
    onChange={(e) => handleFacilitySelect(e.target.value)}
    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900 dark:text-white"
  >
              <option value="">-- Pilih Fasilitas Terdaftar atau Ketik Manual --</option>
              {facilities.map((f) => <option key={f.id} value={f.id}>
                  {f.name} ({f.location})
                </option>)}
              <option value="custom">-- Tulis Manual (Fasilitas Lainnya) --</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama Sarana / Fasilitas <span className="text-rose-500">*</span>
              </label>
              <input
    type="text"
    value={facilityName}
    onChange={(e) => setFacilityName(e.target.value)}
    placeholder="Contoh: AC Sentral Lt. 2, Genset"
    className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900 dark:text-white"
    required
  />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Lokasi Ruangan / Gedung <span className="text-rose-500">*</span>
              </label>
              <input
    type="text"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    placeholder="Contoh: Gedung A Lantai 2"
    className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900 dark:text-white"
    required
  />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tanggal / Periode Pelaksanaan <span className="text-rose-500">*</span>
              </label>
              <input
    type="text"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    placeholder="Contoh: 28 September 2026 atau Setiap Senin"
    className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900 dark:text-white"
    required
  />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Status Pelaksanaan <span className="text-rose-500">*</span>
              </label>
              <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900 dark:text-white font-semibold"
  >
                <option value="upcoming">Mendatang (Terjadwal)</option>
                <option value="ongoing">Sedang Berjalan</option>
                <option value="done">Selesai Dilakukan</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Jenis Servis / Deskripsi Pemeliharaan <span className="text-rose-500">*</span>
            </label>
            <textarea
    rows={2}
    value={type}
    onChange={(e) => setType(e.target.value)}
    placeholder="Contoh: Pembersihan filter udara, penggantian oli kompresor, kalibrasi sensor safety..."
    className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900 dark:text-white resize-none"
    required
  />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Pelaksana / Vendor / PIC Teknisi <span className="text-rose-500">*</span>
            </label>
            <input
    type="text"
    value={pic}
    onChange={(e) => setPic(e.target.value)}
    placeholder="Contoh: PT Sejuk Mandiri (Vendor HVAC) / Teknisi Internal"
    className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-900 dark:text-white"
    required
  />
          </div>

          {
    /* Footer Buttons */
  }
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2.5">
            <button
    type="button"
    onClick={onClose}
    className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
  >
              Batal
            </button>
            <button
    type="submit"
    disabled={isSubmitting}
    className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 disabled:opacity-50 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
  >
              {isSubmitting ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Tambah Jadwal"}
            </button>
          </div>
        </form>

      </div>
    </div>;
};
