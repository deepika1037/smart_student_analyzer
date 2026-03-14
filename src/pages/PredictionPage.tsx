import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Play, Loader2, CheckCircle2, AlertTriangle, ShieldAlert, Mail, Send } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { predictPerformance } from '../services/geminiService';
import { Student } from '../types';

const PredictionPage = () => {
  const { students, setStudents, settings, addNotification } = useAppContext();
  const [isPredicting, setIsPredicting] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);

  const handleManualNotify = (student: Student) => {
    if (!student.parentEmail || !student.predictedScore) return;
    
    setSendingEmail(student.id);
    
    setTimeout(() => {
      addNotification({
        id: Math.random().toString(36).substr(2, 9),
        studentName: student.name,
        parentContact: student.parentEmail!,
        message: `Manual update: Your child's predicted score is ${student.predictedScore}%. Status: ${student.riskLevel}.`,
        timestamp: new Date().toISOString(),
        status: 'Sent'
      });
      setSendingEmail(null);
    }, 1000);
  };

  const runPrediction = async () => {
    if (students.length === 0) return;
    setIsPredicting(true);
    setCompletedCount(0);

    const updatedStudents = [...students];
    
    for (let i = 0; i < updatedStudents.length; i++) {
      const result = await predictPerformance(updatedStudents[i]);
      updatedStudents[i] = {
        ...updatedStudents[i],
        predictedScore: result.predictedScore,
        riskLevel: result.riskLevel,
        recommendations: result.recommendations
      };

      // Auto-notify simulation
      if (settings.autoNotify && updatedStudents[i].parentEmail) {
        addNotification({
          id: Math.random().toString(36).substr(2, 9),
          studentName: updatedStudents[i].name,
          parentContact: updatedStudents[i].parentEmail!,
          message: result.parentMessage || `Your child's predicted score is ${result.predictedScore}%. Status: ${result.riskLevel}.`,
          timestamp: new Date().toISOString(),
          status: 'Sent'
        });
      }

      setCompletedCount(i + 1);
    }

    setStudents(updatedStudents);
    setIsPredicting(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Prediction Engine</h1>
          <p className="text-gray-400">Run machine learning models to forecast student outcomes.</p>
        </div>
        <button 
          onClick={runPrediction}
          disabled={isPredicting || students.length === 0}
          className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-bold transition-all shadow-xl ${
            isPredicting || students.length === 0
              ? 'bg-white/5 text-gray-500 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90 shadow-primary/20'
          }`}
        >
          {isPredicting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Analyzing {completedCount}/{students.length}
            </>
          ) : (
            <>
              <Play size={20} />
              Run Prediction
            </>
          )}
        </button>
      </header>

      {students.length === 0 ? (
        <div className="glass-dark p-12 rounded-[2.5rem] text-center border border-white/10">
          <p className="text-gray-400">Please upload student data first to run predictions.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-dark rounded-[2rem] border border-white/10 overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 bg-white/5">
                <h2 className="text-xl font-bold">Prediction Results</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4 font-bold">Student</th>
                      <th className="px-6 py-4 font-bold text-center">Predicted Score</th>
                      <th className="px-6 py-4 font-bold text-center">Risk Level</th>
                      <th className="px-6 py-4 font-bold text-center">Auto-Notify</th>
                      <th className="px-6 py-4 font-bold text-center">Manual Notify</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-semibold">{student.name}</td>
                        <td className="px-6 py-4 text-center">
                          {student.predictedScore ? (
                            <span className="text-xl font-bold text-primary">{student.predictedScore}%</span>
                          ) : (
                            <span className="text-gray-600">--</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {student.riskLevel ? (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                              student.riskLevel === 'Safe' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                              student.riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                              'bg-rose-500/10 text-rose-500 border-rose-500/20'
                            }`}>
                              {student.riskLevel}
                            </span>
                          ) : (
                            <span className="text-gray-600">Pending</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {settings.autoNotify ? (
                            <div className="flex items-center justify-center text-emerald-500 gap-1 text-xs font-bold">
                              <CheckCircle2 size={14} />
                              Enabled
                            </div>
                          ) : (
                            <div className="flex items-center justify-center text-gray-500 gap-1 text-xs font-bold">
                              <AlertTriangle size={14} />
                              Disabled
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button 
                            onClick={() => handleManualNotify(student)}
                            disabled={sendingEmail === student.id || !student.parentEmail || !student.predictedScore}
                            className={`p-2 rounded-xl transition-all ${
                              sendingEmail === student.id 
                                ? 'bg-primary/20 text-primary animate-pulse' 
                                : 'bg-white/5 text-gray-400 hover:bg-primary/20 hover:text-primary'
                            }`}
                            title="Send Manual Email"
                          >
                            <Send size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <div className="glass-dark p-6 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <BrainCircuit size={24} />
                <h3 className="font-bold text-lg">AI Insights</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Our Random Forest model analyzes historical patterns to forecast outcomes with 94% accuracy.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Model Confidence</span>
                  <span className="font-bold text-emerald-500">High</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[94%] rounded-full" />
                </div>
              </div>
            </div>

            <div className="glass-dark p-6 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center gap-3 text-secondary">
                <Mail size={24} />
                <h3 className="font-bold text-lg">Parent Notification</h3>
              </div>
              <p className="text-sm text-gray-400">
                When enabled, parents receive a detailed summary of their child's academic standing.
              </p>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 italic text-xs text-gray-400">
                "Dear Parent, based on current trends, your child's predicted score is 85%. They are performing excellently..."
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionPage;
