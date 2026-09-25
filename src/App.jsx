import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { Toast } from "./components/Toast";
import { LoginPage } from "./pages/LoginPage";
import { EmployeeView } from "./pages/EmployeeView";
import { AdminView } from "./pages/AdminView";
const MainLayout = () => {
  const { user, isLoading } = useAuth();
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [isEmployeeCreateOpen, setIsEmployeeCreateOpen] = useState(false);
  if (isLoading) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-teal-700 dark:border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Memuat FasiReport...</p>
        </div>
      </div>;
  }
  if (!user) {
    return <>
        <LoginPage />
        <Toast />
      </>;
  }
  const isAdmin = user.role === "admin";
  const getPageTitle = () => {
    if (isAdmin) {
      if (currentTab === "facilities") return "Kelola Fasilitas";
      if (currentTab === "all-reports") return "Semua Laporan";
      if (currentTab === "maintenance-schedule") return "Kelola Jadwal Servis & Pemeliharaan";
      if (currentTab === "guides") return "Panduan & SOP Fasilitas";
      return "Dashboard Admin";
    } else {
      if (currentTab === "facilities") return "Daftar Fasilitas Perusahaan";
      if (currentTab === "my-reports") return "Laporan Saya";
      if (currentTab === "create-report") return "Buat Laporan Kerusakan";
      if (currentTab === "maintenance-schedule") return "Jadwal Servis Rutin Gedung";
      if (currentTab === "guides") return "Panduan & SOP Pelaporan";
      return "Dashboard Karyawan";
    }
  };
  return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased transition-colors">
      {
    /* Left Persistent Sidebar */
  }
      <Sidebar
    currentTab={currentTab}
    onSelectTab={setCurrentTab}
    onOpenCreateReport={() => {
      setCurrentTab("create-report");
    }}
  />

      {
    /* Main Viewport Content with Top Bar */
  }
      <div className="md:pl-64 flex flex-col min-h-screen">
        <TopBar
    title={getPageTitle()}
    badge="FASIREPORT"
  />

        <main className="flex-1 p-5 sm:p-7 lg:p-8 max-w-7xl w-full mx-auto">
          {user.role === "employee" ? <EmployeeView
    currentTab={currentTab}
    onSelectTab={setCurrentTab}
    isCreateOpen={isEmployeeCreateOpen}
    setIsCreateOpen={setIsEmployeeCreateOpen}
  /> : <AdminView
    currentTab={currentTab}
    onSelectTab={setCurrentTab}
  />}
        </main>
      </div>

      {
    /* Global Notifications */
  }
      <Toast />
    </div>;
};
export default function App() {
  return <ThemeProvider>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </ThemeProvider>;
}
