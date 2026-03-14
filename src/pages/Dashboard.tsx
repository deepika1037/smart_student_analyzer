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
  LineChart, 
  Line,
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
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-dark p-6 rounded-3xl border border-white/10">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Predicted Final Score</p>
                <p className="text-4xl font-bold text-primary">{studentData.predictedScore || '--'}%</p>
                <p className="text-xs text-gray-400 mt-2">Based on current academic trends</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-dark p-6 rounded-3xl border border-white/10">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Risk Status</p>
                <div className="mt-2">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider border ${
                    studentData.riskLevel === 'Safe' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                    studentData.riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                    'bg-rose-500/10 text-rose-500 border-rose-500/20'
                  }`}>
                    {studentData.riskLevel || 'Pending'}
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-dark p-8 rounded-[2.5rem] border border-white/10">
                <h3 className="text-xl font-bold mb-6">Academic Breakdown</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Internal Marks', value: studentData.internalMarks, max: 20, color: 'bg-primary' },
                    { label: 'Assignment Marks', value: studentData.assignmentMarks, max: 10, color: 'bg-secondary' },
                    { label: 'Previous Semester', value: studentData.previousSemesterMarks, max: 100, color: 'bg-emerald-500' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{item.label}</span>
                        <span className="font-bold">{item.value} / {item.max}</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${(item.value / item.max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="glass-dark p-8 rounded-[2.5rem] border border-white/10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="text-primary" size={20} />
                  AI Improvement Suggestions
                </h3>
                <div className="space-y-4">
                  {studentData.recommendations?.map((rec, i) => (
                    <div key={i} className="flex gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-300">{rec}</p>
                    </div>
                  )) || (
                    <p className="text-gray-500 italic text-center py-8">Run prediction to see AI suggestions.</p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const totalStudents = students.length;
  const highRiskCount = students.filter(s => s.riskLevel === 'High').length;
  const lowAttendanceCount = students.filter(s => s.attendance < 75).length;
  const avgScore = totalStudents > 0 
    ? Math.round(students.reduce((acc, s) => acc + (s.predictedScore || 0), 0) / totalStudents)
    : 0;
  const safeCount = students.filter(s => s.riskLevel === 'Safe').length;

  const pieData = [
    { name: 'Safe', value: safeCount, color: '#10b981' },
    { name: 'Medium', value: students.filter(s => s.riskLevel === 'Medium').length, color: '#f59e0b' },
    { name: 'High', value: highRiskCount, color: '#f43f5e' },
  ].filter(d => d.value > 0);

  const barData = students.slice(0, 6).map(s => ({
    name: s.name.split(' ')[0],
    score: s.predictedScore || 0,
    attendance: s.attendance
  }));

  // Attendance vs Marks Correlation Data
  const scatterData = students.map(s => ({
    attendance: s.attendance,
    marks: s.predictedScore || (s.previousSemesterMarks),
    name: s.name
  }));

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.username}</h1>
          <p className="text-gray-400">Here's what's happening with your students today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl border border-emerald-500/20 text-sm font-bold flex items-center gap-2">
            <CheckCircle2 size={16} />
            System Online
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: totalStudents, icon: Users, color: 'text-primary', bg: 'bg-primary/10', trend: '+12%', up: true },
          { label: 'Avg Performance', value: `${avgScore}%`, icon: TrendingUp, color: 'text-secondary', bg: 'bg-secondary/10', trend: '+5%', up: true },
          { label: 'High Risk', value: highRiskCount, icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-500/10', trend: '-2%', up: false },
          { label: 'Low Attendance', value: lowAttendanceCount, icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-500/10', trend: '+3%', up: true },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-dark p-6 rounded-3xl border border-white/10 relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} opacity-20 rounded-bl-[4rem] -mr-8 -mt-8 group-hover:scale-110 transition-transform`} />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 glass-dark p-8 rounded-[2.5rem] border border-white/10"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Performance Overview</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-xs text-gray-400">Predicted Score</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="score" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-dark p-8 rounded-[2.5rem] border border-white/10 flex flex-col"
        >
          <h3 className="text-xl font-bold mb-8">Risk Distribution</h3>
          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-3xl font-bold">{totalStudents}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Total</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {pieData.map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ backgroundColor: item.color }} />
                <p className="text-[10px] text-gray-400 font-bold uppercase">{item.name}</p>
                <p className="text-sm font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Attendance vs Marks Graph */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-dark p-8 rounded-[2.5rem] border border-white/10"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold">Attendance vs Marks Correlation</h3>
            <p className="text-sm text-gray-400">Analyzing how attendance impacts student performance.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-3 h-3 bg-secondary rounded-full" />
              <span>Student Data Point</span>
            </div>
          </div>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis type="number" dataKey="attendance" name="Attendance" unit="%" stroke="#94a3b8" fontSize={12} />
              <YAxis type="number" dataKey="marks" name="Marks" unit="%" stroke="#94a3b8" fontSize={12} />
              <ZAxis type="number" range={[100, 100]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #ffffff10', borderRadius: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Scatter name="Students" data={scatterData} fill="#f59e0b" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Activity / High Risk Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-dark rounded-[2.5rem] border border-white/10 overflow-hidden"
        >
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <AlertCircle className="text-rose-500" size={20} />
              Critical Attention Needed
            </h3>
            <button className="text-xs text-primary font-bold hover:underline">View All</button>
          </div>
          <div className="p-2">
            {students.filter(s => s.riskLevel === 'High').slice(0, 4).map((student, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 font-bold">
                    {student.name[0]}
                  </div>
                  <div>
                    <p className="font-bold">{student.name}</p>
                    <p className="text-xs text-gray-400">Predicted Score: {student.predictedScore}%</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all">
                  Analyze
                </button>
              </div>
            ))}
            {students.filter(s => s.riskLevel === 'High').length === 0 && (
              <div className="p-12 text-center text-gray-500 italic">
                No high-risk students detected.
              </div>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-dark rounded-[2.5rem] border border-white/10 overflow-hidden"
        >
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xl font-bold">Recent Predictions</h3>
          </div>
          <div className="p-6 space-y-6">
            {students.filter(s => s.predictedScore).slice(0, 3).map((s, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-1 h-12 bg-primary rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-bold">Prediction generated for {s.name}</p>
                  <p className="text-xs text-gray-400 mt-1">Score: {s.predictedScore}% • Risk: {s.riskLevel}</p>
                  <p className="text-[10px] text-gray-500 mt-2">2 minutes ago</p>
                </div>
              </div>
            ))}
            {students.filter(s => s.predictedScore).length === 0 && (
              <div className="p-12 text-center text-gray-500 italic">
                No recent predictions.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
