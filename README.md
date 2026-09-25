# FasiReport — Sistem Pelaporan & Pemeliharaan Fasilitas Perusahaan

**FasiReport** adalah platform sistem informasi pelaporan dan tata kelola fasilitas berbasis web (*Single Page Application*) yang dirancang khusus untuk memodernisasi pemantauan, pelaporan kerusakan, dan pemeliharaan fasilitas di lingkungan perkantoran dan gedung perusahaan. 

Aplikasi ini menjembatani komunikasi antara karyawan sebagai pelapor/pengguna fasilitas dengan tim operasional (*General Affairs* & Teknisi Fasilitas) agar seluruh kerusakan sarana kantor tertangani secara cepat, akuntabel, transparan, dan terdokumentasi lengkap dalam satu basis data terpadu.

---

## 📌 Daftar Isi
- [Latar Belakang & Masalah Operasional](#-latar-belakang--masalah-operasional)
- [Tujuan & Manfaat Penerapan Sistem](#-tujuan--manfaat-penerapan-sistem)
- [Bahasa Pemrograman & Teknologi yang Digunakan](#-bahasa-pemrograman--teknologi-yang-digunakan)
- [Arsitektur Sistem Frontend](#-arsitektur-sistem-frontend)
- [Arsitektur Sistem Backend & Lapisan Data](#-arsitektur-sistem-backend--lapisan-data)
- [Hak Akses & Peran Pengguna (RBAC)](#-hak-akses--peran-pengguna-rbac)
- [Fitur Utama Aplikasi](#-fitur-utama-aplikasi)
  - [1. Modul Karyawan (Employee Portal)](#1-modul-karyawan-employee-portal)
  - [2. Modul Administrator (Admin & Tim Teknisi)](#2-modul-administrator-admin--tim-teknisi)
- [Alur Kerja Sistem Lengkap (End-to-End Workflow)](#-alur-kerja-sistem-lengkap-end-to-end-workflow)
  - [A. Alur Pelaporan & Penanganan Aduan Fasilitas](#a-alur-pelaporan--penanganan-aduan-fasilitas)
  - [B. Alur Penjadwalan Pemeliharaan Preventif](#b-alur-penjadwalan-pemeliharaan-preventif)
- [Klasifikasi Prioritas & Target Tanggap (SLA)](#-klasifikasi-prioritas--target-tanggap-sla)
- [Kategori Fasilitas yang Didukung](#-kategori-fasilitas-yang-didukung)
- [Struktur Direktori Proyek](#-struktur-direktori-proyek)
- [Panduan Menjalankan Aplikasi](#-panduan-menjalankan-aplikasi)

---

## 💡 Latar Belakang & Masalah Operasional

Di lingkungan kerja perkantoran konvensional, pelaporan kerusakan sarana dan prasarana sering kali menghadapi hambatan:

1. **Laporan Sering Tercecer:** Aduan melalui pesan instan chat atau lisan mudah tertumpuk dan tidak terarsip resmi.
2. **Ketiadaan Akuntabilitas Penanganan:** Karyawan tidak mengetahui status pengerjaan atau teknisi yang ditugaskan.
3. **Penanganan Tanpa Skala Prioritas:** Teknisi kesulitan memilah kendala darurat (listrik korslet, pipa pecah, AC ruang server mati) dengan kendala estetika ringan.
4. **Hilangnya Riwayat Perawatan (Maintenance History):** Perusahaan tidak memiliki rekam jejak apakah suatu fasilitas sering rusak berulang kali, menyulitkan keputusan belanja modal (*CapEx*).

**FasiReport** menyelesaikan masalah tersebut dengan menyediakan sistem tiket digital dengan nomor urut terstruktur (`#101`, `#102`, dst.), linimasa audit (*audit trail*), dan jadwal servis preventif berkala (`#1`, `#2`, dst.).

---

## 🎯 Tujuan & Manfaat Penerapan Sistem

### Bagi Karyawan (Pelapor)
- **Kemudahan Melapor:** Formulir pengaduan cerdas yang terhubung dengan katalog inventaris kantor, lokasi presisi, dan unggah foto bukti kerusakan.
- **Transparansi Waktu-Nyata:** Memantau perkembangan tiket secara langsung melalui linimasa berjenjang (*Dilaporkan* $\rightarrow$ *Diproses* $\rightarrow$ *Diperbaiki* $\rightarrow$ *Selesai*).
- **Kenyamanan Tempat Kerja:** Kerusakan fasilitas ditangani secara terukur sehingga aktivitas operasional tidak terganggu.

### Bagi Tim General Affairs & Teknisi
- **Manajemen Tiket Terstruktur:** Tiket tersusun rapi dengan nomor referensi unik, indikator prioritas (*Tinggi*, *Sedang*, *Rendah*), dan batas waktu target (*SLA*).
- **Dokumentasi & Catatan Teknis:** Mencatat kronologi penggantian suku cadang dan status fisik fasilitas.
- **Agenda Pemeliharaan Preventif:** Mencegah kerusakan mendadak melalui modul jadwal servis berkala fasilitas gedung.

### Bagi Manajemen Perusahaan
- **Efisiensi Anggaran:** Mengurangi biaya perbaikan darurat melalui servis preventif terjadwal.
- **Pengambilan Keputusan Berbasis Data (*Data-Driven*):** Menyediakan ringkasan rasio kondisi aset (siap operasi vs rusak/dalam perbaikan).
- **Standar K3 Gedung:** Memastikan kepatuhan keselamatan sarana gedung (APAR, lift, instalasi kelistrikan, genset cadangan).

---

## 💻 Bahasa Pemrograman & Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan tumpukan teknologi modern berstandar industri:

| Komponen | Bahasa / Teknologi | Versi | Peran & Penggunaan |
| :--- | :--- | :--- | :--- |
| **Bahasa Utama** | **JavaScript (ES2022+)** | Standar ESNext | Logika aplikasi, manipulasi data, fungsi asynchronous, dan modularitas ES Modules |
| **Sintaks UI** | **JSX (JavaScript XML)** | React 19 JSX Runtime | Representasi antarmuka deklaratif berbasis komponen modular (`.jsx`) |
| **Markah Web** | **HTML5** | Standar W3C | Kerangka semantik berkas entri `index.html` dengan metadata responsif & SEO |
| **Tata Letak & Gaya** | **CSS3 & Tailwind CSS** | Tailwind CSS v4 | Sistem pewarnaan dinamis (*light/dark mode*), responsivitas mobile-first, transisi halus, dan typography |
| **Format Pertukaran Data** | **JSON (JavaScript Object Notation)** | Standar RFC 8259 | Format penyimpanan data sesi, tiket, riwayat, dan metadata konfigurasi |
| **Dokumentasi** | **Markdown (CommonMark)** | Standar GFM | Format dokumentasi berkas `README.md` |
| **Frontend Library** | **React** | v19.0.1 | Framework komponen antarmuka reaktif berbasis hooks |
| **Build Tool & Bundler** | **Vite** | v8.3.0 | Compiler modul cepat, *Fast Refresh* development server, dan optimizer bundle |
| **Ikonografi** | **Lucide React** | v0.546.0 | Koleksi ikon SVG modern untuk estetika dan kejelasan navigasi |
| **Tipografi** | **Google Fonts — Plus Jakarta Sans** | Web Font | Font sans-serif korporat dengan tingkat keterbacaan tinggi di berbagai resolusi layar |

---

## 🎨 Arsitektur Sistem Frontend

Arsitektur sisi klien (Frontend) dirancang berbasis pola **Component-Driven Architecture** dan **Unidirectional Data Flow**:

```
[ index.html ] ──> [ main.jsx ] ──> [ ErrorBoundary.jsx ]
                                            │
                                    [ ThemeProvider ] (Tema Gelap/Terang)
                                            │
                                    [ AuthProvider ] (Autentikasi & RBAC)
                                            │
                                        [ App.jsx ]
                                       ┌────┴────┐
                         [ LoginPage.jsx ]   [ Role-Based Layout ]
                                                   ├── [ TopBar.jsx ]
                                                   ├── [ Sidebar.jsx ]
                                                   ├── [ EmployeeView.jsx ]
                                                   └── [ AdminView.jsx ]
```

### 1. Titik Masuk & Error Boundary
- **`index.html`**: Halaman entri berisikan konfigurasi viewport, font Google, dan kontainer mount `#root`.
- **`src/main.jsx`**: Menginisialisasi React Root menggunakan `createRoot` dengan `StrictMode` serta membungkus aplikasi di dalam `ErrorBoundary`.
- **`src/components/ErrorBoundary.jsx`**: Komponen kelas penangkap exception runtime (mencegah layar blank jika terjadi kerusakan data peramban) dan menyediakan tombol pemulihan cache instan.

### 2. Manajemen State Global (Context API)
- **`src/context/ThemeContext.jsx`**: Menyimpan preferensi tema pengguna (`light` atau `dark`), mengaktifkan sinkronisasi otomatis ke class `dark` pada dokumen `<html>`, serta mengingat pilihan di `localStorage`.
- **`src/context/AuthContext.jsx`**: Mengelola status autentikasi, data pengguna aktif, token sesi, verifikasi izin akses (*RBAC*), serta antrean notifikasi umpan balik (*Toast*).

### 3. Komponen Antarmuka & Modalitas
- **`TopBar.jsx`**: Menampilkan profil pengguna yang sedang login, badge peran (*Karyawan* / *Admin*), tombol peralihan tema gelap/terang, dan tombol logout.
- **`Sidebar.jsx`**: Navigasi vertikal responsif yang menyaring menu sesuai peran pengguna.
- **`ReportModal.jsx`**: Tampilan detail pop-up tiket aduan yang memuat foto kerusakan, spesifikasi aset, dan linimasa pelacakan riwayat (*tracking history*).
- **`CreateEditReportModal.jsx`**: Formulir pembuatan dan pengubahan tiket aduan oleh karyawan.
- **`FacilityModal.jsx`**: Formulir penambahan dan pembaruan data master inventaris fasilitas kantor oleh admin.
- **`MaintenanceModal.jsx`**: Formulir pembuatan dan modifikasi jadwal servis berkala.
- **`ReportTimeline.jsx`**: Visualisasi audit trail kronologis pergantian status tiket beserta stempel waktu dan identitas petugas.
- **`ReportStatusBadge.jsx` & `PriorityBadge.jsx`**: Indikator visual terstandarisasi untuk status penanganan dan tingkat urgensi tiket.
- **`Toast.jsx`**: Notifikasi *floating alert* interaktif untuk konfirmasi aksi sukses maupun pesan kesalahan.

---

## 🗄 Arsitektur Sistem Backend & Lapisan Data

Sistem FasiReport mengimplementasikan **Client-Side Emulated Backend Architecture** yang meniru fungsionalitas RESTful API backend secara penuh melalui modul layanan terpusat:

```
[ Komponen UI (Pages / Modals) ]
              │
              ▼  (Memanggil operasi CRUD & Mutasi)
     [ dataService.js ]  <─── Bertindak sebagai REST API Controller & DAO
              │
     ┌────────┴──────────────────────────┐
     ▼                                   ▼
[ Safe Storage Engine ]          [ Pub/Sub Event Bus ]
  ├── safeLocalStorage            └── notifyChange() -> subscribe()
  └── safeSessionStorage                 (Sinkronisasi UI Real-time)
              │
     ┌────────┴──────────────────────────┐
     ▼                                   ▼
[ In-Memory Fallback ]           [ Browser LocalStorage ]
 (Aktif saat private browsing     (Penyimpanan permanen tiket,
  atau iframe sandbox ketat)      fasilitas, jadwal & riwayat)
```

### 1. Emulasi RESTful Controller (`src/services/dataService.js`)
Layanan `dataService.js` berperan sebagai *Facade* pengontrol data yang memvalidasi hak akses (*Authorization Guard*), menjaga integritas relasional antar entitas, dan mengeksekusi operasi transaksi data:
- **Autentikasi Sesi:** Menerapkan otentikasi token berbasis sesi (`sessionStorage`) ala *Laravel Sanctum*, menjaga isolasi akun Karyawan dan Admin tanpa konflik sesi.
- **Penyimpanan Terproteksi (`safeLocalStorage` & `safeSessionStorage`):** Dilengkapi penanganan *try-catch* otomatis dan fallback memori internal (`memLocalStorage`), menjamin aplikasi tetap berjalan 100% stabil bahkan saat dibuka di lingkungan peramban mode Privat/Incognito atau iFrame terisolasi.
- **Pub/Sub Reactive Event Bus:** Menyediakan metode `subscribe(callback)` dan `notifyChange(event, payload)`. Ketika status tiket diubah admin, seluruh komponen (dashboard, tabel, lencana angka) otomatis tersinkronisasi secara waktu-nyata tanpa perlu memuat ulang peramban (*no hard reload*).

### 2. Mekanisme Penomoran Urut Otomatis (Sequential ID Generator)
Untuk memastikan konsistensi data yang profesional dan mudah dilacak:
- **Nomor Tiket Laporan Aduan:** Dimulai secara berurutan mengikuti data contoh (`#101`, `#102`, `#103`, `#104`, `#105`, `#106`, dst.).
- **Nomor Jadwal Pemeliharaan:** Dimulai berurutan (`#1`, `#2`, `#3`, `#4`, `#5`, dst.).
- **Nomor Master Fasilitas:** Dimulai berurutan (`#1`, `#2`, `#3`, `#4`, `#5`, `#6`, dst.).
- **Nomor Riwayat Audit Trail:** Menggunakan ID inkremental terurut (`#1`, `#2`, dst.) yang tertaut langsung dengan `report_id`.
- **Auto-Healing Migration:** Pada saat inisialisasi awal, sistem secara otomatis mendeteksi dan menormalkan data lawas jika terdapat ID acak hasil timestamp menjadi nomor urut yang rapi.

### 3. Blueprint Integrasi ke RESTful Backend Riil
Struktur fungsi pada `dataService.js` telah dipersiapkan agar mudah dialihkan ke backend server nyata (seperti Express.js, Laravel, Go Gin, atau Spring Boot):

| Metode pada `dataService.js` | Endpoint RESTful Padanan | Metode HTTP | Deskripsi Fungsi |
| :--- | :--- | :--- | :--- |
| `login(email, password)` | `/api/auth/login` | `POST` | Autentikasi dan penerbitan token sesi |
| `logout()` | `/api/auth/logout` | `POST` | Pencabutan token sesi aktif |
| `getReports(user)` | `/api/reports` | `GET` | Mengambil daftar tiket aduan (difilter per user jika karyawan) |
| `createReport(data, user)` | `/api/reports` | `POST` | Mendaftarkan tiket aduan kerusakan baru |
| `updateReport(id, data)` | `/api/reports/{id}` | `PUT` | Memperbarui data tiket yang berstatus 'reported' |
| `deleteReport(id)` | `/api/reports/{id}` | `DELETE` | Membatalkan tiket yang belum diproses |
| `updateReportStatus(id, ...)`| `/api/reports/{id}/status`| `PATCH` | Transisi status berurutan oleh Admin/Teknisi |
| `getFacilities(role)` | `/api/facilities` | `GET` | Katalog master fasilitas inventaris kantor |
| `createFacility(data)` | `/api/facilities` | `POST` | Menambah aset sarana baru (khusus Admin) |
| `getMaintenanceSchedules()` | `/api/maintenance-schedules` | `GET` | Membaca agenda pemeliharaan preventif |
| `createMaintenanceSchedule()`| `/api/maintenance-schedules` | `POST` | Membuat agenda servis baru |

---

## 🔑 Hak Akses & Peran Pengguna (RBAC)

Aplikasi menerapkan sistem pembatasan wewenang berbasis peran (*Role-Based Access Control*):

| Peran Pengguna | Email Masuk | Kata Sandi | Deskripsi Hak & Wewenang |
| :--- | :--- | :--- | :--- |
| **Karyawan 1** *(Employee)* | `karyawan.test@example.com` | `password123` | • Mengirim laporan kerusakan fasilitas kantor lengkap dengan foto.<br>• Melihat dan melacak riwayat aduan pribadinya.<br>• Menghapus atau mengedit laporan miliknya yang belum diproses.<br>• Melihat katalog inventaris fasilitas aktif dan jadwal servis berkala. |
| **Karyawan 2** *(Staf Lain)* | `karyawan2.test@example.com` | `password123` | Akun karyawan tambahan untuk mensimulasikan pelaporan dari staf ruangan berbeda. |
| **Administrator** *(Admin / GA)* | `admin.test@example.com` | `password123` | • Memantau statistik kesehatan seluruh fasilitas kantor.<br>• Menindaklanjuti tiket aduan masuk dengan alur status berurutan.<br>• Memberikan catatan teknis penanganan dan estimasi pengerjaan.<br>• Mengelola katalog inventaris fasilitas (tambah, edit, nonaktifkan).<br>• Mengatur dan memperbarui agenda servis pemeliharaan preventif. |

---

## 🌟 Fitur Utama Aplikasi

### 1. Modul Karyawan (Employee Portal)
- **Ringkasan Metrik Pribadi:** Statistik jumlah tiket aktif, tiket dalam proses, dan tiket yang telah terselesaikan.
- **Formulir Pengaduan Cerdas:**
  - Pemilihan fasilitas terdaftar langsung dari katalog inventaris perusahaan.
  - Penentuan lokasi terperinci (gedung, lantai, dan nomor ruangan).
  - Skala prioritas kerusakan (*Rendah*, *Sedang*, *Tinggi*).
  - Lampiran foto bukti kerusakan langsung dari perangkat (tersimpan optimal dalam format data URI).
  - Kotak deskripsi bebas untuk menjelaskan detail kendala secara komprehensif.
- **Linimasa Riwayat Aduan (Tracking Timeline):** Memantau perkembangan penanganan langkah demi langkah disertai stempel waktu dan catatan teknis admin.
- **Pencarian & Penyaringan Tiket:** Filter dinamis berdasarkan status penanganan dan kolom pencarian kata kunci.

### 2. Modul Administrator (Admin & Tim Teknisi)
- **Dasbor Analitik Operasional:**
  - Metrik total tiket masuk, tiket butuh penanganan, tiket dalam pengerjaan, dan tingkat penyelesaian aduan.
  - Diagram lingkaran proporsi prioritas kerusakan (*Tinggi, Sedang, Rendah*).
  - Indikator rasio kesehatan inventaris (unit siap operasi vs unit nonaktif/servis).
- **Tindak Lanjut Tiket Berjenjang:**
  - Verifikasi aduan baru yang masuk.
  - Perubahan status wajib berurutan (*Dilaporkan $\rightarrow$ Diproses $\rightarrow$ Diperbaiki $\rightarrow$ Selesai*).
  - Kolom catatan tindak lanjut teknisi di setiap fase pembaruan status.
- **Katalog Master Fasilitas (Asset Management):**
  - Penambahan unit sarana kantor baru, perubahan informasi lokasi/spesifikasi, dan pengaturan status aktif/nonaktif.
- **Modul Pemeliharaan Preventif (Maintenance Schedules):**
  - Penjadwalan servis rutin berkala (misal: cuci AC 3 bulanan, inspeksi sensor keselamatan lift, uji berkala genset).
  - Pengubahan status agenda (*Mendatang $\rightarrow$ Sedang Berjalan $\rightarrow$ Selesai Dilakukan*).
- **Panduan & SOP Fasilitas:** Ringkasan target respons tanggap darurat (*SLA*) dan direktori kontak penting.

---

## 🔄 Alur Kerja Sistem Lengkap (End-to-End Workflow)

### A. Alur Pelaporan & Penanganan Aduan Fasilitas

```
[ KARYAWAN ]                                       [ ADMINISTRATOR / TEKNISI ]
     │
     ▼
1. Temukan Fasilitas Rusak
     │
     ▼
2. Isi Formulir Pengaduan
   - Pilih unit dari katalog inventaris
   - Tentukan lokasi gedung & ruangan
   - Pilih skala prioritas (Rendah/Sedang/Tinggi)
   - Unggah foto bukti kerusakan
   - Tulis kronologi / gejala kendala
     │
     ▼
3. Tiket Terbit dengan Nomor Urut (#101, #102, dst.)
   (Status Awal: DILAPORKAN)
   • Masuk ke dashboard pelapor & admin
   • Titik riwayat audit trail pertama tercatat otomatis
     │
     │────────────────────────────────────────────────────────┐
     │                                                        │
     │                                                        ▼
     │                                           4. Verifikasi Tiket oleh Admin
     │                                              - Memeriksa keabsahan aduan & foto
     │                                              - Menunjuk teknisi pelaksana / vendor
     │                                              - Menulis catatan estimasi pengerjaan
     │                                              - Mengubah status ke: DIPROSES
     │                                                        │
     │                                                        ▼
     │                                           5. Tindakan Fisik Perbaikan
     │                                              - Teknisi memeriksa unit di lokasi
     │                                              - Melakukan reparasi / ganti suku cadang
     │                                              - Mengubah status ke: DIPERBAIKI
     │                                                        │
     │                                                        ▼
     │                                           6. Pengujian & Penutupan Aduan
     │                                              - Memastikan fasilitas berfungsi normal
     │                                              - Menuliskan catatan penyelesaian akhir
     │                                              - Mengubah status ke: SELESAI
     │                                                        │
     ▼                                                        │
7. Notifikasi & Verifikasi Selesai <───────────────────────────┘
   - Linimasa tiket karyawan diperbarui secara otomatis
   - Tiket ditutup permanen dengan rekam jejak audit tuntas
```

### B. Alur Penjadwalan Pemeliharaan Preventif

```
[ TIM OPERASIONAL / GA ]
     │
     ▼
1. Tentukan Agenda Perawatan Rutin Aset
   (Misal: Cuci Filter AC, Uji Sensor Lift, Servis Genset, Refill APAR)
     │
     ▼
2. Buka Modul "Jadwal Servis" & Klik "Tambah Jadwal Baru"
   - Pilih fasilitas target dari inventaris
   - Tentukan tanggal / periode pengerjaan
   - Tulis deskripsi jenis pemeliharaan
   - Tunjuk teknisi penanggung jawab (PIC) atau vendor rekanan
     │
     ▼
3. Jadwal Tersimpan dengan Nomor Urut (#1, #2, dst.)
   (Status: MENDATANG)
     │
     ▼
4. Saat Hari Pelaksanaan Tiba
   - Klik "Ubah Status" menjadi: SEDANG BERJALAN
   - Teknisi melaksanakan pembersihan dan inspeksi
     │
     ▼
5. Pemeliharaan Selesai Dilakukan
   - Klik "Ubah Status" menjadi: SELESAI DILAKUKAN
   - Kondisi fasilitas dipastikan kembali prima untuk mendukung produktivitas kantor
```

---

## ⏱ Klasifikasi Prioritas & Target Tanggap (SLA)

| Tingkat Prioritas | Indikator Kerusakan | Contoh Kasus Nyata | Target Tanggap (SLA) |
| :--- | :--- | :--- | :--- |
| 🔴 **Tinggi (High / Emergency)** | Kerusakan yang menghentikan operasional vital, menimbulkan risiko keselamatan, atau risiko kebakaran. | Listrik korslet, AC ruang server mati, lift macet berpenumpang, pipa air utama pecah. | **Respons < 1–2 Jam**<br>Tindakan langsung di lokasi |
| 🟡 **Sedang (Medium)** | Kerusakan parsial yang mengganggu kenyamanan kerja namun masih ada alternatif penunjang lain. | Lampu ruangan mati sebagian, dispenser bocor rembes, proyektor ruang rapat buram. | **Respons 1x24 Jam**<br>Dijadwalkan dalam antrean harian |
| 🟢 **Rendah (Low)** | Kendala minor atau aspek estetika yang tidak mengganggu jalannya kegiatan operasional. | Engsel pintu lemari arsip berderit, cat dinding mengelupas, jam dinding mati kehabisan baterai. | **Respons 2–3 Hari Kerja**<br>Ditangani saat inspeksi berkala |

---

## 🏢 Kategori Fasilitas yang Didukung

1. **Pendingin & Tata Udara (HVAC):** AC Split, AC Cassette, VRV/Sentral, Exhaust Fan ruang server.
2. **Penerangan & Kelistrikan:** Lampu koridor, panel MCB, saklar ruangan, stopkontak meja kerja, genset cadangan gedung.
3. **Peralatan Kantor & Elektronik:** Printer jaringan, proyektor ruang rapat, smart TV presentasi, dispenser pantry.
4. **Sanitasi & Plumbing:** Kran air wastafel, kloset duduk, pompa booster, instalasi pipa saluran air.
5. **Mebel & Ergonomi Kantor:** Kursi kerja hidrolik, meja staf, partisi partikel, loker arsip.
6. **Transportasi Vertikal & Keamanan:** Lift penumpang/barang, pintu darurat, APAR tabung kimia, detektor asap (*smoke detector*).

---

## 📂 Struktur Direktori Proyek

```text
├── index.html                 # Berkas HTML utama dengan pemuat universal (Vite + Standalone fallback)
├── metadata.json              # Konfigurasi nama dan deskripsi aplikasi
├── package.json               # Daftar dependensi modul npm dan skrip otomasi
├── tsconfig.json              # Konfigurasi compiler TypeScript & path alias
├── vite.config.js             # Konfigurasi bundler Vite, Tailwind, IIFE build & auto-sync
├── README.md                  # Dokumentasi penjelasan lengkap sistem (berkas ini)
├── assets/
│   └── app.js                 # Bundle mandiri siap pakai (IIFE + CSS inlined) untuk eksekusi langsung
├── dist/                      # Direktori hasil kompilasi produksi siap hosting
│   ├── index.html             # Entri web siap deploy (bebas dependensi eksternal)
│   ├── 404.html               # Pengarah rute SPA untuk GitHub Pages
│   ├── .nojekyll              # Penonaktif pemroses Jekyll di GitHub Pages
│   └── assets/
│       └── app.js             # Bundle JavaScript & CSS mandiri
└── src/
    ├── main.jsx               # Titik masuk utama inisialisasi React DOM
    ├── App.jsx                # Komponen utama penentu layout peran & navigasi
    ├── index.css              # Pengaturan gaya global Tailwind CSS v4 & tema
    ├── types.js               # Konfigurasi status tiket, badge prioritas, dan peta alur
    ├── context/
    │   ├── AuthContext.jsx    # Penyedia context autentikasi sesi dan peran RBAC
    │   └── ThemeContext.jsx   # Penyedia context tema tampilan (light/dark mode)
    ├── services/
    │   └── dataService.js     # Lapisan controller data, safe storage, dan penomoran urut
    ├── pages/
    │   ├── LoginPage.jsx      # Halaman masuk untuk peran Karyawan dan Administrator
    │   ├── EmployeeView.jsx   # Dasbor pelaporan dan pelacakan tiket aduan karyawan
    │   └── AdminView.jsx      # Dasbor tata kelola tiket, inventaris, dan jadwal admin
    └── components/
        ├── TopBar.jsx         # Bilah atas profil pengguna, tombol tema, dan logout
        ├── Sidebar.jsx        # Panel navigasi tab samping berbasis peran
        ├── ReportModal.jsx    # Dialog detail tiket aduan & foto bukti kerusakan
        ├── CreateEditReportModal.jsx # Dialog formulir pengaduan kerusakan baru
        ├── FacilityModal.jsx  # Dialog formulir penambahan & edit master inventaris
        ├── MaintenanceModal.jsx # Dialog formulir jadwal servis & pemeliharaan preventif
        ├── ReportTimeline.jsx # Komponen linimasa visualisasi riwayat penanganan tiket
        ├── ReportStatusBadge.jsx # Komponen lencana visual status aduan tiket
        ├── PriorityBadge.jsx  # Komponen lencana visual tingkat urgensi aduan
        ├── Toast.jsx          # Komponen notifikasi pop-up sukses / peringatan
        └── ErrorBoundary.jsx  # Komponen penangkap kesalahan runtime peramban
```

---

## 🚀 Panduan Menjalankan & Menyebarkan Aplikasi (Deployment)

Proyek ini telah dikonfigurasi dengan arsitektur **Universal Multi-Mode**: dapat dijalankan baik dalam mode pengembangan (*Dev Server*), mode editor VS Code (*Live Server*), langsung diklik dua kali dari File Explorer (*file:// protocol*), maupun dideploy ke GitHub Pages tanpa kendala layar kosong.

### ⚠️ Mengapa Layar Sebelumnya Kosong & Bagaimana Solusinya?
1. **Penyebab Layar Kosong:**
   - **Klik Dua Kali / File Explorer:** Browser modern secara baku memblokir skrip bertipe modul (`<script type="module">`) pada protokol `file://` karena kebijakan keamanan CORS (*origin 'null'*).
   - **VS Code Live Server:** Ekstensi Live Server hanya bertindak sebagai static file server biasa, tidak dapat memproses sintaks mentah JSX (`.jsx`) dan bare import (`import React from 'react'`) tanpa proses bundling.
   - **GitHub Pages:** Jika repositori di-deploy langsung dari root tanpa bundle yang sudah terkompilasi, peramban akan gagal mengimpor modul sumber.
2. **Solusi yang Diterapkan di Proyek Ini:**
   - Telah ditambahkan bundle mandiri berformat **IIFE (Immediately Invoked Function Expression)** di `assets/app.js` dan `dist/assets/app.js` yang menggabungkan seluruh logika React, Tailwind CSS, dan komponen ke dalam skrip klasik.
   - Skrip klasik (`<script src="./assets/app.js"></script>`) **100% bebas dari batasan CORS**, sehingga dapat dieksekusi secara instan pada protokol `file://`, Live Server, dan GitHub Pages.
   - Berkas `index.html` dilengkapi **Universal Fallback Loader** yang otomatis mendeteksi lingkungan eksekusi secara cerdas.

---

### Cara 1: Buka Langsung dengan Klik Dua Kali (Tanpa Server / Offline)
1. Ekstrak berkas zip proyek hasil export ke folder komputer Anda.
2. Klik dua kali berkas **`index.html`** (atau berkas **`dist/index.html`**) langsung dari Windows File Explorer atau macOS Finder.
3. Aplikasi akan langsung terbuka di browser Anda (URL berawalan `file:///...`) dan berjalan lancar tanpa memerlukan koneksi internet maupun instalasi software tambahan.

---

### Cara 2: Menjalankan Menggunakan VS Code
Anda memiliki dua opsi mudah saat membuka proyek di VS Code:

#### Opsi A — Menggunakan Terminal & Node.js (Rekomendasi Pengembang)
Pastikan telah menginstal [Node.js](https://nodejs.org/) (versi 18 ke atas):
```bash
# 1. Buka folder proyek di terminal VS Code, lalu pasang dependensi
npm install

# 2. Jalankan server pengembangan Vite
npm run dev
# atau:
npm start
```
Akses di browser melalui: `http://localhost:3000`

#### Opsi B — Menggunakan Ekstensi VS Code "Live Server" (Tanpa Terminal)
1. Pasang ekstensi **Live Server** di VS Code jika belum ada.
2. Buka folder proyek di VS Code.
3. Klik kanan pada berkas `index.html` (atau `dist/index.html`), lalu pilih **"Open with Live Server"**.
4. Aplikasi akan otomatis terbuka dan dimuat oleh Universal Loader tanpa error modul.

---

### Cara 3: Deploy ke GitHub Pages
Proyek ini siap dipublikasikan ke GitHub Pages dengan sangat mudah:

#### Langkah Cepat (Deploy dari Branch `main` / `root`):
1. Buat repositori baru di GitHub (misal: `fasireport`).
2. Unggah/push seluruh isi folder proyek ke repositori GitHub Anda:
   ```bash
   git init
   git add .
   git commit -m "Initial release FasiReport"
   git branch -M main
   git remote add origin https://github.com/USERNAME/fasireport.git
   git push -u origin main
   ```
3. Buka repositori Anda di situs GitHub, masuk ke menu **Settings** $\rightarrow$ **Pages**.
4. Pada bagian **Build and deployment**:
   - **Source:** Pilih `Deploy from a branch`
   - **Branch:** Pilih `main`, folder `/ (root)`
   - Klik **Save**.
5. Tunggu sekitar 1–2 menit, situs Anda akan aktif di `https://USERNAME.github.io/fasireport/` dan langsung berjalan sempurna! *(Berkas `dist/404.html` dan `dist/.nojekyll` telah disediakan untuk menjamin navigasi SPA berjalan mulus tanpa broken link).*

---

### Cara 4: Mengompilasi Ulang Bundle (Production Build)
Jika Anda melakukan perubahan kode di dalam folder `src/`, Anda dapat memperbarui bundle mandiri dengan satu perintah:
```bash
npm run build
```
Perintah ini akan secara otomatis:
- Mengompilasi kode `src/` menjadi bundle produksi berkecepatan tinggi.
- Menghasilkan berkas `dist/index.html`, `dist/404.html`, dan `dist/.nojekyll`.
- Menyinkronkan bundle `app.js` terbaru ke direktori `/assets/` di root proyek.

---

## 📄 Lisensi & Hak Penggunaan
Sistem ini dirancang sebagai standar digitalisasi operasional dan pemeliharaan fasilitas perusahaan modern. Terbuka untuk diadaptasi dan dikembangkan lebih lanjut sesuai kebutuhan internal organisasi Anda.
