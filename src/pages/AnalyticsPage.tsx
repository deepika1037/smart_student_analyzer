import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  ScatterChart,
  Scatter,
  ZAxis,
  ReferenceLine
} from 'recharts';
import { useAppContext } from '../context/AppContext';
import { BarChart3, TrendingUp, Target, Users, Calendar } from 'lucide-react';

const AnalyticsPage = () => {
  const { students } = useAppContext();

  const data = students.map(s => ({
    name: s.name.split(' ')[0],
    attendance: s.attendance,
    marks: s.predictedScore || 0,
    internals: s.internalMarks,
    prevSem: s.previousSemesterMarks
  }));

  // Mock time-series data for monthly trends
  const monthlyTrendData = [
    { month: 'Jan', avgAttendance: 95, avgPredictedScore: 82 },
    { month: 'Feb', avgAttendance: 92, avgPredictedScore: 80 },
    { month: 'Mar', avgAttendance: 88, avgPredictedScore: 78 },
    { month: 'Apr', avgAttendance: 84, avgPredictedScore: 75 },
    { month: 'May', avgAttendance: 70, avgPredictedScore: 65 },
    { month: 'Jun', avgAttendance: 78, avgPredictedScore: 72 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Advanced Analytics</h1>
        <p className="text-gray-400">Deep dive into academic trends and correlations.</p>
      </header>

      {/* Monthly Trend Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-dark p-8 rounded-[2.5rem] border border-white/10"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-xl text-amber-500">
              <Calendar size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Monthly Performance Trend</h3>
              <p className="text-xs text-gray-500">Class average attendance vs. predicted score over the semester.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full" />
              <span className="text-xs text-gray-400 font-bold">Avg Attendance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-xs text-gray-400 font-bold">Avg Predicted Score</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0 border-t-2 border-dashed border-rose-500" />
              <span className="text-xs text-rose-500 font-bold">Critical (75%)</span>
            </div>
          </div>
        </div>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #ffffff10', borderRadius: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <ReferenceLine 
                y={75} 
                stroke="#ef4444" 
                strokeDasharray="3 3" 
                label={{ 
                  value: 'Critical Threshold (75%)', 
                  position: 'insideBottomRight', 
                  fill: '#ef4444', 
                  fontSize: 10, 
                  fontWeight: 'bold',
                  offset: 10
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="avgAttendance" 
                stroke="#f59e0b" 
                strokeWidth={4} 
                dot={{ r: 6, fill: '#f59e0b', strokeWidth: 2, stroke: '#000' }} 
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="avgPredictedScore" 
                stroke="#2563eb" 
                strokeWidth={4} 
                dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#000' }} 
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attendance vs Marks Correlation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark p-8 rounded-[2.5rem] border border-white/10"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/20 rounded-xl text-primary">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-xl font-bold">Attendance vs. Predicted Score</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis type="number" dataKey="attendance" name="Attendance" unit="%" stroke="#94a3b8" fontSize={12} />
                <YAxis type="number" dataKey="marks" name="Score" unit="%" stroke="#94a3b8" fontSize={12} />
                <ZAxis type="number" range={[64, 144]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#111827', border: '1px solid #ffffff10' }} />
                <Scatter name="Students" data={data} fill="#2563eb" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs text-gray-500 text-center italic">
            Higher attendance generally correlates with higher predicted final scores.
          </p>
        </motion.div>

        {/* Performance Distribution Area Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-dark p-8 rounded-[2.5rem] border border-white/10"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-secondary/20 rounded-xl text-secondary">
              <BarChart3 size={20} />
            </div>
            <h3 className="text-xl font-bold">Score Distribution Trend</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorMarks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #ffffff10' }} />
                <Area type="monotone" dataKey="marks" stroke="#06b6d4" fillOpacity={1} fill="url(#colorMarks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Comparison Radar/Line Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-dark p-8 rounded-[2.5rem] border border-white/10 lg:col-span-2"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-500">
              <Target size={20} />
            </div>
            <h3 className="text-xl font-bold">Multi-Metric Comparison</h3>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #ffffff10' }} />
                <Line type="monotone" dataKey="attendance" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="marks" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="prevSem" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-xs text-gray-400 font-bold">Attendance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary rounded-full" />
              <span className="text-xs text-gray-400 font-bold">Predicted Score</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full" />
              <span className="text-xs text-gray-400 font-bold">Prev Semester</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
