import {
  NEXT_STATUS_MAP
} from "../types";
const USERS_KEY = "fasireport_users";
const FACILITIES_KEY = "fasireport_facilities";
const REPORTS_KEY = "fasireport_reports";
const HISTORIES_KEY = "fasireport_histories";
const MAINTENANCE_KEY = "fasireport_maintenance_schedules";
const TOKEN_KEY = "fasireport_session_token";
const USER_KEY = "fasireport_session_user";
const memLocalStorage = {};
const memSessionStorage = {};
export const safeLocalStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const val = window.localStorage.getItem(key);
        if (val !== null) return val;
      }
    } catch {
    }
    return memLocalStorage[key] ?? null;
  },
  setItem: (key, value) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
    }
    memLocalStorage[key] = value;
  },
  removeItem: (key) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
    }
    delete memLocalStorage[key];
  }
};
export const safeSessionStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        const val = window.sessionStorage.getItem(key);
        if (val !== null) return val;
      }
    } catch {
    }
    return memSessionStorage[key] ?? null;
  },
  setItem: (key, value) => {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
      }
    } catch {
    }
    memSessionStorage[key] = value;
  },
  removeItem: (key) => {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.removeItem(key);
      }
    } catch {
    }
    delete memSessionStorage[key];
  }
};
const INITIAL_USERS = [
  {
    id: 1,
    name: "Admin Test",
    email: "admin.test@example.com",
    password: "password123",
    role: "admin",
    created_at: "2026-09-01T08:00:00Z",
    updated_at: "2026-09-01T08:00:00Z"
  },
  {
    id: 2,
    name: "Karyawan Test",
    email: "karyawan.test@example.com",
    password: "password123",
    role: "employee",
    created_at: "2026-09-02T08:00:00Z",
    updated_at: "2026-09-02T08:00:00Z"
  },
  {
    id: 3,
    name: "Karyawan Kedua",
    email: "karyawan2.test@example.com",
    password: "password123",
    role: "employee",
    created_at: "2026-09-03T08:00:00Z",
    updated_at: "2026-09-03T08:00:00Z"
  }
];
const INITIAL_FACILITIES = [
  {
    id: 1,
    name: "AC Ruang Produksi",
    location: "Gedung A Lantai 1",
    category: "Pendingin",
    status: "active",
    created_at: "2026-09-01T09:00:00Z",
    updated_at: "2026-09-01T09:00:00Z"
  },
  {
    id: 2,
    name: "Lampu Koridor",
    location: "Gedung A Lantai 2",
    category: "Penerangan",
    status: "active",
    created_at: "2026-09-01T09:15:00Z",
    updated_at: "2026-09-01T09:15:00Z"
  },
  {
    id: 3,
    name: "Printer Ruang Administrasi",
    location: "Gedung B Lantai 1",
    category: "Elektronik",
    status: "active",
    created_at: "2026-09-01T09:30:00Z",
    updated_at: "2026-09-01T09:30:00Z"
  },
  {
    id: 4,
    name: "Proyektor Ruang Rapat Alpha",
    location: "Gedung B Lantai 2",
    category: "Elektronik",
    status: "active",
    created_at: "2026-09-05T10:00:00Z",
    updated_at: "2026-09-05T10:00:00Z"
  },
  {
    id: 5,
    name: "Lift Penumpang Barat",
    location: "Gedung A",
    category: "Transportasi Vertikal",
    status: "inactive",
    // inactive demonstration
    created_at: "2026-09-06T11:00:00Z",
    updated_at: "2026-09-10T14:00:00Z"
  }
];
const INITIAL_REPORTS = [
  {
    id: 101,
    user_id: 2,
    facility_id: 1,
    description: "Suhu AC tidak dingin dan mengeluarkan bunyi mendengung cukup keras sejak pagi hari saat jam shift pertama.",
    photo: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
    priority: "high",
    status: "processing",
    admin_note: "Sedang ditindaklanjuti oleh teknisi vendor pendingin",
    created_at: "2026-09-20T08:30:00Z",
    updated_at: "2026-09-20T10:15:00Z"
  },
  {
    id: 102,
    user_id: 2,
    facility_id: 2,
    description: "Dua lampu di koridor depan ruang arsip berkedip-kedip dan satu lampu mati total sehingga koridor remang.",
    photo: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80",
    priority: "medium",
    status: "reported",
    admin_note: null,
    created_at: "2026-09-22T13:45:00Z",
    updated_at: "2026-09-22T13:45:00Z"
  },
  {
    id: 103,
    user_id: 3,
    facility_id: 3,
    description: "Paper jam berulang kali pada tray 2 dan roller penarik kertas tampak aus.",
    photo: null,
    priority: "low",
    status: "repaired",
    admin_note: "Roller tray 2 sudah diganti baru, sedang dalam tahap uji cetak 50 lembar",
    created_at: "2026-09-18T09:00:00Z",
    updated_at: "2026-09-19T11:30:00Z"
  },
  {
    id: 104,
    user_id: 2,
    facility_id: 4,
    description: "Warna proyektor dominan kuning kehijauan dan gambar buram saat presentasi rapat mingguan.",
    photo: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    priority: "medium",
    status: "completed",
    admin_note: "Lampu proyektor diganti baru & lensa dibersihkan. Kualitas proyeksi normal kembali.",
    created_at: "2026-09-15T14:20:00Z",
    updated_at: "2026-09-17T16:00:00Z"
  }
];
const INITIAL_HISTORIES = [
  {
    id: 1,
    report_id: 101,
    changed_by: 2,
    status: "reported",
    note: "Laporan kerusakan AC Ruang Produksi dibuat oleh pelapor.",
    created_at: "2026-09-20T08:30:00Z",
    updated_at: "2026-09-20T08:30:00Z"
  },
  {
    id: 2,
    report_id: 101,
    changed_by: 1,
    status: "processing",
    note: "Sedang ditindaklanjuti oleh teknisi vendor pendingin",
    created_at: "2026-09-20T10:15:00Z",
    updated_at: "2026-09-20T10:15:00Z"
  },
  {
    id: 3,
    report_id: 102,
    changed_by: 2,
    status: "reported",
    note: "Laporan lampu koridor dibuat oleh pelapor.",
    created_at: "2026-09-22T13:45:00Z",
    updated_at: "2026-09-22T13:45:00Z"
  },
  {
    id: 4,
    report_id: 103,
    changed_by: 3,
    status: "reported",
    note: "Laporan printer macet dibuat oleh pelapor.",
    created_at: "2026-09-18T09:00:00Z",
    updated_at: "2026-09-18T09:00:00Z"
  },
  {
    id: 5,
    report_id: 103,
    changed_by: 1,
    status: "processing",
    note: "Tiket diteruskan ke tim maintenance IT kantor.",
    created_at: "2026-09-18T10:00:00Z",
    updated_at: "2026-09-18T10:00:00Z"
  },
  {
    id: 6,
    report_id: 103,
    changed_by: 1,
    status: "repaired",
    note: "Roller tray 2 sudah diganti baru, sedang dalam tahap uji cetak 50 lembar",
    created_at: "2026-09-19T11:30:00Z",
    updated_at: "2026-09-19T11:30:00Z"
  },
  {
    id: 7,
    report_id: 104,
    changed_by: 2,
    status: "reported",
    note: "Laporan proyektor dibuat oleh pelapor.",
    created_at: "2026-09-15T14:20:00Z",
    updated_at: "2026-09-15T14:20:00Z"
  },
  {
    id: 8,
    report_id: 104,
    changed_by: 1,
    status: "processing",
    note: "Proyektor diperiksa tim GA Gedung B.",
    created_at: "2026-09-16T09:00:00Z",
    updated_at: "2026-09-16T09:00:00Z"
  },
  {
    id: 9,
    report_id: 104,
    changed_by: 1,
    status: "repaired",
    note: "Komponen lampu dan filter dibersihkan serta dikalibrasi.",
    created_at: "2026-09-17T11:00:00Z",
    updated_at: "2026-09-17T11:00:00Z"
  },
  {
    id: 10,
    report_id: 104,
    changed_by: 1,
    status: "completed",
    note: "Lampu proyektor diganti baru & lensa dibersihkan. Kualitas proyeksi normal kembali.",
    created_at: "2026-09-17T16:00:00Z",
    updated_at: "2026-09-17T16:00:00Z"
  }
];
const INITIAL_MAINTENANCE = [
  {
    id: 1,
    facility: "AC Sentral & Split",
    location: "Gedung A (Lantai 1 - 3)",
    date: "28 September 2026",
    type: "Pembersihan Filter & Pengisian Freon Berkala",
    pic: "PT Sejuk Mandiri (Teknisi HVAC)",
    status: "upcoming",
    created_at: "2026-09-15T08:00:00Z"
  },
  {
    id: 2,
    facility: "Lift Penumpang 1 & 2",
    location: "Lobi Utama Gedung A",
    date: "30 September 2026",
    type: "Audit Kelayakan & Safety Sensor Rutin",
    pic: "Kone Elevator Engineering",
    status: "upcoming",
    created_at: "2026-09-16T09:00:00Z"
  },
  {
    id: 3,
    facility: "APAR & Fire Alarm Detector",
    location: "Seluruh Koridor & Tangga Darurat",
    date: "15 September 2026",
    type: "Pengecekan Tekanan Tabung & Refill Bubuk Kimia",
    pic: "Safety First Indonesia",
    status: "done",
    created_at: "2026-09-10T10:00:00Z"
  },
  {
    id: 4,
    facility: "Genset Cadangan Daya 250kVA",
    location: "Ruang Power Plant Basement",
    date: "05 Oktober 2026",
    type: "Penggantian Oli Mesin & Uji Running Otomatis",
    pic: "Teknisi MEP Internal",
    status: "upcoming",
    created_at: "2026-09-18T11:00:00Z"
  }
];
class DataService {
  constructor() {
    this.initStorage();
  }
  initStorage() {
    try {
      if (typeof window === "undefined") return;
      safeLocalStorage.removeItem("token");
      safeLocalStorage.removeItem("user");
      safeLocalStorage.removeItem(TOKEN_KEY);
      safeLocalStorage.removeItem(USER_KEY);
      const rawUsers = safeLocalStorage.getItem(USERS_KEY);
      if (!rawUsers) {
        safeLocalStorage.setItem(USERS_KEY, JSON.stringify(INITIAL_USERS));
      } else {
        const users = JSON.parse(rawUsers || "[]");
        let modified = false;
        for (const initUser of INITIAL_USERS) {
          const idx = users.findIndex((u) => u.email.toLowerCase() === initUser.email.toLowerCase());
          if (idx === -1) {
            users.push(initUser);
            modified = true;
          } else if (users[idx].password !== initUser.password || users[idx].role !== initUser.role) {
            users[idx].password = initUser.password;
            users[idx].role = initUser.role;
            modified = true;
          }
        }
        if (modified) {
          safeLocalStorage.setItem(USERS_KEY, JSON.stringify(users));
        }
      }
      if (!safeLocalStorage.getItem(FACILITIES_KEY)) {
        safeLocalStorage.setItem(FACILITIES_KEY, JSON.stringify(INITIAL_FACILITIES));
      }
      if (!safeLocalStorage.getItem(REPORTS_KEY)) {
        safeLocalStorage.setItem(REPORTS_KEY, JSON.stringify(INITIAL_REPORTS));
      }
      if (!safeLocalStorage.getItem(HISTORIES_KEY)) {
        safeLocalStorage.setItem(HISTORIES_KEY, JSON.stringify(INITIAL_HISTORIES));
      }
      if (!safeLocalStorage.getItem(MAINTENANCE_KEY)) {
        safeLocalStorage.setItem(MAINTENANCE_KEY, JSON.stringify(INITIAL_MAINTENANCE));
      }

      // Auto-migrate any historical timestamp IDs (e.g. from Date.now()) to sequential numbers matching examples
      const rawStoredReports = safeLocalStorage.getItem(REPORTS_KEY);
      if (rawStoredReports) {
        try {
          const reports = JSON.parse(rawStoredReports);
          let hasLargeId = false;
          for (const r of reports) {
            if (Number(r.id) > 10000) {
              hasLargeId = true;
              break;
            }
          }
          if (hasLargeId) {
            let maxNormal = 100;
            for (const r of reports) {
              const num = Number(r.id);
              if (!isNaN(num) && num >= 100 && num < 10000) {
                if (num > maxNormal) maxNormal = num;
              }
            }
            let nextSeq = maxNormal + 1;
            const rawHist = safeLocalStorage.getItem(HISTORIES_KEY);
            const histories = rawHist ? JSON.parse(rawHist) : [];
            const reversed = [...reports].reverse();
            for (const r of reversed) {
              if (Number(r.id) > 10000) {
                const oldId = r.id;
                const newId = nextSeq++;
                r.id = newId;
                for (const h of histories) {
                  if (h.report_id === oldId) {
                    h.report_id = newId;
                  }
                }
              }
            }
            safeLocalStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
            safeLocalStorage.setItem(HISTORIES_KEY, JSON.stringify(histories));
          }
        } catch (e) {
          console.warn("Report ID migration skipped:", e);
        }
      }

      // Auto-migrate maintenance schedules timestamp IDs
      const rawStoredMaint = safeLocalStorage.getItem(MAINTENANCE_KEY);
      if (rawStoredMaint) {
        try {
          const schedules = JSON.parse(rawStoredMaint);
          let hasLargeMaint = false;
          for (const s of schedules) {
            if (Number(s.id) > 10000) {
              hasLargeMaint = true;
              break;
            }
          }
          if (hasLargeMaint) {
            let maxNormal = 0;
            for (const s of schedules) {
              const num = Number(s.id);
              if (!isNaN(num) && num > 0 && num < 10000) {
                if (num > maxNormal) maxNormal = num;
              }
            }
            let nextSeq = maxNormal + 1;
            const reversed = [...schedules].reverse();
            for (const s of reversed) {
              if (Number(s.id) > 10000) {
                s.id = nextSeq++;
              }
            }
            safeLocalStorage.setItem(MAINTENANCE_KEY, JSON.stringify(schedules));
          }
        } catch (e) {
          console.warn("Maintenance ID migration skipped:", e);
        }
      }
    } catch (e) {
      console.warn("Storage initialization safely recovered:", e);
    }
  }
  resetDemoData() {
    safeLocalStorage.setItem(USERS_KEY, JSON.stringify(INITIAL_USERS));
    safeLocalStorage.setItem(FACILITIES_KEY, JSON.stringify(INITIAL_FACILITIES));
    safeLocalStorage.setItem(REPORTS_KEY, JSON.stringify(INITIAL_REPORTS));
    safeLocalStorage.setItem(HISTORIES_KEY, JSON.stringify(INITIAL_HISTORIES));
    safeLocalStorage.setItem(MAINTENANCE_KEY, JSON.stringify(INITIAL_MAINTENANCE));
  }
  // Auth getters & setters conforming with Laravel Sanctum (session-based)
  getCurrentUser() {
    if (typeof window === "undefined") return null;
    const raw = safeSessionStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  getToken() {
    if (typeof window === "undefined") return null;
    return safeSessionStorage.getItem(TOKEN_KEY);
  }
  login(email, password) {
    const users = JSON.parse(safeLocalStorage.getItem(USERS_KEY) || "[]");
    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPassword = (password || "").trim();

    let found = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!found) {
      found = INITIAL_USERS.find((u) => u.email.toLowerCase() === cleanEmail);
    }

    if (!found || found.password !== cleanPassword) {
      throw new Error("Email atau kata sandi tidak cocok dengan data kami.");
    }

    const { password: _, ...safeUser } = found;
    const token = `${safeUser.id}|laravel_sanctum_${Math.random().toString(36).substring(2)}`;
    safeSessionStorage.setItem(TOKEN_KEY, token);
    safeSessionStorage.setItem(USER_KEY, JSON.stringify(safeUser));
    return { user: safeUser, token };
  }
  register(name, email, password) {
    const users = JSON.parse(safeLocalStorage.getItem(USERS_KEY) || "[]");
    if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      throw new Error("Email sudah terdaftar. Silakan gunakan email lain atau login.");
    }
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: "employee",
      // public registration can strictly only register employees
      created_at: now,
      updated_at: now
    };
    users.push(newUser);
    safeLocalStorage.setItem(USERS_KEY, JSON.stringify(users));
    const { password: _, ...safeUser } = newUser;
    const token = `${safeUser.id}|laravel_sanctum_${Math.random().toString(36).substring(2)}`;
    safeSessionStorage.setItem(TOKEN_KEY, token);
    safeSessionStorage.setItem(USER_KEY, JSON.stringify(safeUser));
    return { user: safeUser, token };
  }
  logout() {
    if (typeof window !== "undefined") {
      safeSessionStorage.removeItem(TOKEN_KEY);
      safeSessionStorage.removeItem(USER_KEY);
      safeLocalStorage.removeItem("token");
      safeLocalStorage.removeItem("user");
    }
  }
  // Facility Management
  getFacilities(role) {
    const raw = safeLocalStorage.getItem(FACILITIES_KEY);
    const facilities = raw ? JSON.parse(raw) : [];
    if (role === "employee") {
      return facilities.filter((f) => f.status === "active");
    }
    return facilities;
  }
  getFacilityById(id) {
    const facilities = this.getFacilities("admin");
    return facilities.find((f) => f.id === id);
  }
  createFacility(data, currentUser) {
    if (currentUser.role !== "admin") {
      throw new Error("Akses ditolak: Hanya admin yang dapat menambah fasilitas.");
    }
    const facilities = this.getFacilities("admin");
    const now = (/* @__PURE__ */ new Date()).toISOString();
    let maxId = 0;
    for (const f of facilities) {
      const num = Number(f.id);
      if (!isNaN(num) && num > 0 && num < 10000) {
        if (num > maxId) maxId = num;
      }
    }
    const newFacility = {
      id: maxId + 1,
      name: data.name.trim(),
      location: data.location.trim(),
      category: data.category.trim(),
      status: data.status || "active",
      created_at: now,
      updated_at: now
    };
    facilities.unshift(newFacility);
    safeLocalStorage.setItem(FACILITIES_KEY, JSON.stringify(facilities));
    this.notifyChange("facility_created", newFacility);
    return newFacility;
  }
  updateFacility(id, data, currentUser) {
    if (currentUser.role !== "admin") {
      throw new Error("Akses ditolak: Hanya admin yang dapat mengubah fasilitas.");
    }
    const facilities = this.getFacilities("admin");
    const index = facilities.findIndex((f) => f.id === id);
    if (index === -1) {
      throw new Error("Fasilitas tidak ditemukan.");
    }
    facilities[index] = {
      ...facilities[index],
      ...data,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    safeLocalStorage.setItem(FACILITIES_KEY, JSON.stringify(facilities));
    this.notifyChange("facility_updated", facilities[index]);
    return facilities[index];
  }
  toggleFacilityStatus(id, currentUser) {
    if (currentUser.role !== "admin") {
      throw new Error("Akses ditolak: Hanya admin yang dapat mengubah status fasilitas.");
    }
    const facility = this.getFacilityById(id);
    if (!facility) throw new Error("Fasilitas tidak ditemukan.");
    const newStatus = facility.status === "active" ? "inactive" : "active";
    return this.updateFacility(id, { status: newStatus }, currentUser);
  }
  // Reports
  getReports(currentUser) {
    const rawReports = safeLocalStorage.getItem(REPORTS_KEY);
    const reports = rawReports ? JSON.parse(rawReports) : [];
    const facilities = this.getFacilities("admin");
    const users = JSON.parse(safeLocalStorage.getItem(USERS_KEY) || "[]");
    const rawHistories = safeLocalStorage.getItem(HISTORIES_KEY);
    const histories = rawHistories ? JSON.parse(rawHistories) : [];
    const enriched = reports.map((report) => {
      const facility = facilities.find((f) => f.id === report.facility_id);
      const user = users.find((u) => u.id === report.user_id);
      const reportHistories = histories.filter((h) => h.report_id === report.id).map((h) => ({
        ...h,
        changed_by_user: users.find((u) => u.id === h.changed_by) ? {
          id: users.find((u) => u.id === h.changed_by).id,
          name: users.find((u) => u.id === h.changed_by).name,
          role: users.find((u) => u.id === h.changed_by).role
        } : void 0
      })).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      return {
        ...report,
        facility,
        user: user ? { id: user.id, name: user.name, email: user.email, role: user.role } : void 0,
        status_histories: reportHistories
      };
    });
    if (currentUser.role === "employee") {
      return enriched.filter((r) => r.user_id === currentUser.id);
    }
    return enriched;
  }
  getReportById(id, currentUser) {
    const all = this.getReports(currentUser);
    const report = all.find((r) => r.id === id);
    if (!report) {
      throw new Error("Laporan tidak ditemukan.");
    }
    if (currentUser.role === "employee" && report.user_id !== currentUser.id) {
      throw new Error("Akses ditolak: Anda tidak memiliki izin untuk melihat laporan ini.");
    }
    return report;
  }
  createReport(data, currentUser) {
    const facility = this.getFacilityById(data.facility_id);
    if (!facility) {
      throw new Error("Fasilitas yang dipilih tidak valid.");
    }
    if (facility.status !== "active") {
      throw new Error("Fasilitas ini sedang nonaktif dan tidak dapat dilaporkan.");
    }
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const rawReports = safeLocalStorage.getItem(REPORTS_KEY);
    const reports = rawReports ? JSON.parse(rawReports) : [];
    
    // Sequential report ID starting from max existing sample (101, 102, 103, 104 -> 105, 106...)
    let maxReportId = 100;
    for (const r of reports) {
      const num = Number(r.id);
      if (!isNaN(num) && num >= 100 && num < 10000) {
        if (num > maxReportId) maxReportId = num;
      }
    }
    const reportId = maxReportId + 1;

    const newReport = {
      id: reportId,
      user_id: currentUser.id,
      facility_id: data.facility_id,
      description: data.description.trim(),
      photo: data.photo || null,
      priority: data.priority,
      status: "reported",
      admin_note: null,
      created_at: now,
      updated_at: now
    };
    reports.unshift(newReport);
    safeLocalStorage.setItem(REPORTS_KEY, JSON.stringify(reports));

    const rawHistories = safeLocalStorage.getItem(HISTORIES_KEY);
    const histories = rawHistories ? JSON.parse(rawHistories) : [];
    let maxHistId = 0;
    for (const h of histories) {
      const num = Number(h.id);
      if (!isNaN(num) && num > 0 && num < 100000) {
        if (num > maxHistId) maxHistId = num;
      }
    }
    const initialHistory = {
      id: maxHistId + 1,
      report_id: reportId,
      changed_by: currentUser.id,
      status: "reported",
      note: "Laporan berhasil dibuat oleh pelapor.",
      created_at: now,
      updated_at: now
    };
    histories.push(initialHistory);
    safeLocalStorage.setItem(HISTORIES_KEY, JSON.stringify(histories));
    const created = this.getReportById(reportId, currentUser);
    this.notifyChange("report_created", created);
    return created;
  }
  updateReport(id, data, currentUser) {
    const rawReports = safeLocalStorage.getItem(REPORTS_KEY);
    const reports = rawReports ? JSON.parse(rawReports) : [];
    const index = reports.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new Error("Laporan tidak ditemukan.");
    }
    const currentReport = reports[index];
    if (currentReport.user_id !== currentUser.id && currentUser.role !== "admin") {
      throw new Error("Akses ditolak: Anda hanya dapat mengedit laporan milik sendiri.");
    }
    if (currentUser.role === "employee" && currentReport.status !== "reported") {
      throw new Error("Laporan tidak dapat diedit karena sudah dalam proses penanganan oleh admin.");
    }
    if (data.facility_id) {
      const facility = this.getFacilityById(data.facility_id);
      if (!facility || facility.status !== "active") {
        throw new Error("Fasilitas tidak valid atau sedang nonaktif.");
      }
    }
    reports[index] = {
      ...currentReport,
      ...data.facility_id ? { facility_id: data.facility_id } : {},
      ...data.description ? { description: data.description.trim() } : {},
      ...data.priority ? { priority: data.priority } : {},
      ...data.photo !== void 0 ? { photo: data.photo } : {},
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    safeLocalStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
    const updated = this.getReportById(id, currentUser);
    this.notifyChange("report_updated", updated);
    return updated;
  }
  deleteReport(id, currentUser) {
    const rawReports = safeLocalStorage.getItem(REPORTS_KEY);
    const reports = rawReports ? JSON.parse(rawReports) : [];
    const report = reports.find((r) => r.id === id);
    if (!report) {
      throw new Error("Laporan tidak ditemukan.");
    }
    if (report.user_id !== currentUser.id && currentUser.role !== "admin") {
      throw new Error("Akses ditolak: Anda hanya dapat menghapus laporan milik sendiri.");
    }
    if (report.status !== "reported") {
      throw new Error("Laporan tidak dapat dihapus karena sudah dalam proses penanganan.");
    }
    const filteredReports = reports.filter((r) => r.id !== id);
    safeLocalStorage.setItem(REPORTS_KEY, JSON.stringify(filteredReports));
    const rawHistories = safeLocalStorage.getItem(HISTORIES_KEY);
    const histories = rawHistories ? JSON.parse(rawHistories) : [];
    const filteredHistories = histories.filter((h) => h.report_id !== id);
    safeLocalStorage.setItem(HISTORIES_KEY, JSON.stringify(filteredHistories));
    this.notifyChange("report_deleted", { id });
  }
  // ADMIN: Update Report Status (STRICT SEQUENTIAL TRANSITION)
  updateReportStatus(id, nextStatus, adminNote, currentUser) {
    if (currentUser.role !== "admin") {
      throw new Error("Akses ditolak: Hanya admin yang berhak memperbarui status laporan.");
    }
    const rawReports = safeLocalStorage.getItem(REPORTS_KEY);
    const reports = rawReports ? JSON.parse(rawReports) : [];
    const index = reports.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new Error("Laporan tidak ditemukan.");
    }
    const report = reports[index];
    const currentStatus = report.status;
    if (currentStatus === "completed") {
      throw new Error("Laporan ini sudah selesai (completed) dan status tidak dapat dilanjutkan lagi.");
    }
    const allowedNext = NEXT_STATUS_MAP[currentStatus];
    if (nextStatus !== allowedNext) {
      throw new Error(
        `Perubahan status harus berurutan! Dari '${currentStatus}' hanya diperbolehkan beralih ke '${allowedNext}'. Lompatan status tidak diizinkan.`
      );
    }
    const now = (/* @__PURE__ */ new Date()).toISOString();
    reports[index] = {
      ...report,
      status: nextStatus,
      admin_note: adminNote ? adminNote.trim() : report.admin_note,
      updated_at: now
    };
    safeLocalStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
    const rawHistories = safeLocalStorage.getItem(HISTORIES_KEY);
    const histories = rawHistories ? JSON.parse(rawHistories) : [];
    let maxHistId = 0;
    for (const h of histories) {
      const num = Number(h.id);
      if (!isNaN(num) && num > 0 && num < 100000) {
        if (num > maxHistId) maxHistId = num;
      }
    }
    const newHistory = {
      id: maxHistId + 1,
      report_id: id,
      changed_by: currentUser.id,
      status: nextStatus,
      note: adminNote ? adminNote.trim() : `Status diperbarui menjadi ${nextStatus}.`,
      created_at: now,
      updated_at: now
    };
    histories.push(newHistory);
    safeLocalStorage.setItem(HISTORIES_KEY, JSON.stringify(histories));
    const updated = this.getReportById(id, currentUser);
    this.notifyChange("report_status_changed", updated);
    return updated;
  }
  getAdminStats() {
    const rawReports = safeLocalStorage.getItem(REPORTS_KEY);
    const reports = rawReports ? JSON.parse(rawReports) : [];
    const facilities = this.getFacilities("admin");
    const totalReports = reports.length;
    const reportedCount = reports.filter((r) => r.status === "reported").length;
    const processingCount = reports.filter((r) => r.status === "processing").length;
    const repairedCount = reports.filter((r) => r.status === "repaired").length;
    const completedCount = reports.filter((r) => r.status === "completed").length;
    const activeFacilitiesCount = facilities.filter((f) => f.status === "active").length;
    const priorityCounts = {
      low: reports.filter((r) => r.priority === "low").length,
      medium: reports.filter((r) => r.priority === "medium").length,
      high: reports.filter((r) => r.priority === "high").length
    };
    return {
      totalReports,
      reportedCount,
      processingCount,
      repairedCount,
      completedCount,
      activeFacilitiesCount,
      priorityCounts
    };
  }
  // MAINTENANCE SCHEDULES (JADWAL PEMELIHARAAN)
  getMaintenanceSchedules() {
    const raw = safeLocalStorage.getItem(MAINTENANCE_KEY);
    if (!raw) return INITIAL_MAINTENANCE;
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_MAINTENANCE;
    }
  }
  saveMaintenanceSchedules(items) {
    safeLocalStorage.setItem(MAINTENANCE_KEY, JSON.stringify(items));
    this.notifyChange("maintenance_change");
  }
  createMaintenanceSchedule(data) {
    const items = this.getMaintenanceSchedules();
    let maxId = 0;
    for (const item of items) {
      const num = Number(item.id);
      if (!isNaN(num) && num > 0 && num < 10000) {
        if (num > maxId) maxId = num;
      }
    }
    const newId = maxId + 1;
    const newItem = {
      ...data,
      id: newId,
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    items.unshift(newItem);
    this.saveMaintenanceSchedules(items);
    return newItem;
  }
  updateMaintenanceSchedule(id, data) {
    const items = this.getMaintenanceSchedules();
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) {
      throw new Error("Jadwal pemeliharaan tidak ditemukan.");
    }
    const updated = { ...items[index], ...data };
    items[index] = updated;
    this.saveMaintenanceSchedules(items);
    return updated;
  }
  deleteMaintenanceSchedule(id) {
    const items = this.getMaintenanceSchedules();
    const filtered = items.filter((i) => i.id !== id);
    this.saveMaintenanceSchedules(filtered);
    return true;
  }
  toggleMaintenanceStatus(id) {
    const items = this.getMaintenanceSchedules();
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) {
      throw new Error("Jadwal pemeliharaan tidak ditemukan.");
    }
    const current = items[index].status;
    const nextStatus = current === "upcoming" ? "ongoing" : current === "ongoing" ? "done" : "upcoming";
    items[index].status = nextStatus;
    this.saveMaintenanceSchedules(items);
    return items[index];
  }
  // REAL-TIME BROADCAST & LISTENERS
  notifyChange(event, payload) {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("fasireport_sync", {
          detail: { event, payload, timestamp: Date.now() }
        })
      );
      try {
        safeLocalStorage.setItem("fasireport_sync_tick", Date.now().toString());
      } catch (e) {
      }
    }
  }
  subscribe(callback) {
    if (typeof window === "undefined") return () => {
    };
    const handleCustom = (e) => callback(e?.detail);
    const handleStorage = (e) => {
      if (e.key === "fasireport_sync_tick" || e.key === REPORTS_KEY || e.key === FACILITIES_KEY || e.key === MAINTENANCE_KEY) {
        callback({ event: "storage_change" });
      }
    };
    window.addEventListener("fasireport_sync", handleCustom);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("fasireport_sync", handleCustom);
      window.removeEventListener("storage", handleStorage);
    };
  }
}
export const dataService = new DataService();
