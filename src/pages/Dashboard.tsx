import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldAlert
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const { students, user } = useAppContext();

  // Student specific view
  if (user?.role === 'Student') {
    const studentData = students.find(s => s.name.toLowerCase().includes(user.username.toLowerCase()) || s.registerNumber === user.username);
    
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user.username}. Here is your academic overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl border border-emerald-500/20 text-sm font-bold flex items-center gap-2">
              <CheckCircle2 size={16} />
              Academic Profile Active
            </div>
          </div>
        </header>

        {!studentData ? (
          <div className="glass-dark p-12 rounded-[2.5rem] border border-white/10 text-center space-y-4">
            <AlertCircle className="mx-auto text-gray-500" size={48} />
            <p className="text-gray-400">Your student record has not been uploaded by the faculty yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-dark p-6 rounded-3xl border border-white/10">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Current Attendance</p>
                <p className={`text-4xl font-bold ${studentData.attendance < 75 ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {studentData.attendance}%
                </p>
                {studentData.attendance < 75 && (
                  <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-2 text-rose-500 text-xs font-bold">
                    <AlertCircle size={14} />
                    Warning: Low Attendance
                  </div>
                )}
              </motion.div>
              {/* Predicted Score and Risk Status Cards... */}
            </div>
            {/* Academic Breakdown and AI Suggestions... */}
          </div>
        )}
      </div>
    );
  }

  // Faculty/Admin View Logic
  const totalStudents = students.length;
  const highRiskCount = students.filter(s => s.riskLevel === 'High').length;
  const lowAttendanceCount = students.filter(s => s.attendance < 75).length;
  const avgScore = totalStudents > 0 
    ? Math.round(students.reduce((acc, s) => acc + (s.predictedScore || 0), 0) / totalStudents)
    : 0;

  // Chart Data Preparation...
  const barData = students.slice(0, 6).map(s => ({
    name: s.name.split(' ')[0],
    score: s.predictedScore || 0,
    attendance: s.attendance
  }));

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.username}</h1>
          <p className="text-gray-400">Here's what's happening with your students today.</p>
        </div>
      </header>

      {/* Stats Grid: Total Students, Avg Performance, High Risk, Low Attendance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Cards... */}
      </div>

      {/* Charts: Performance Overview and Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bar Chart and Pie Chart... */}
      </div>

      {/* Attendance vs Marks Correlation Graph */}
      <motion.div className="glass-dark p-8 rounded-[2.5rem] border border-white/10">
        {/* Scatter Chart... */}
      </motion.div>

      {/* Critical Attention Needed and Recent Predictions Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lists... */}
      </div>
    </div>
  );
};

export default Dashboard;
