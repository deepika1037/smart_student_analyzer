import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student, NotificationLog, User } from '../types';

interface AppContextType {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  notifications: NotificationLog[];
  addNotification: (log: NotificationLog) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  settings: {
    autoNotify: boolean;
  };
  setSettings: React.Dispatch<React.SetStateAction<{ autoNotify: boolean }>>;
  credentials: {
    username: string;
    password: string;
  };
  setCredentials: (creds: { username: string; password: string }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [settings, setSettings] = useState({
    autoNotify: true,
  });
  const [credentials, setCredentials] = useState(() => {
    const saved = localStorage.getItem('app_credentials');
    return saved ? JSON.parse(saved) : { username: 'admin', password: 'admin@123' };
  });

  useEffect(() => {
    localStorage.setItem('app_credentials', JSON.stringify(credentials));
  }, [credentials]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const addNotification = (log: NotificationLog) => {
    setNotifications(prev => [log, ...prev]);
  };

  return (
    <AppContext.Provider value={{ 
      students, setStudents, 
      notifications, addNotification, 
      user, setUser,
      settings, setSettings,
      credentials, setCredentials
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
