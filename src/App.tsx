import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import StudentDataPage from './pages/StudentDataPage';
import PredictionPage from './pages/PredictionPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportPage from './pages/ReportPage';
import SecurityPage from './pages/SecurityPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import NotificationsPage from './pages/NotificationsPage';
import AIChatBox from './components/AIChatBox';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAppContext();
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  if (!user && !isLoginPage) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {!isLoginPage && <Sidebar />}
      <div className={`flex-1 ${!isLoginPage ? 'ml-64' : ''} flex flex-col`}>
        {!isLoginPage && <TopNavbar />}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      <AIChatBox />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<StudentDataPage />} />
            <Route path="/prediction" element={<PredictionPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/reports" element={<ReportPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}
