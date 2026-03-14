import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileSpreadsheet, Search, Trash2, Download, CheckCircle2, AlertCircle, Users, X, Save, Mail, Edit2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Student, NotificationLog } from '../types';

const StudentDataPage = () => {
  const { students, setStudents, addNotification } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [editingStudent, setEditingStudent] = React.useState<Student | null>(null);
  const [sendingEmail, setSendingEmail] = React.useState<string | null>(null);

  const handleEditStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    
    setStudents(prev => prev.map(s => s.id === editingStudent.id ? editingStudent : s));
    setEditingStudent(null);
  };

  const handleSendEmail = (student: Student) => {
    if (!student.parentEmail) return;
    
    setSendingEmail(student.id);
    
    // Simulate API call
    setTimeout(() => {
      const log: NotificationLog = {
        id: Math.random().toString(36).substr(2, 9),
        studentName: student.name,
        parentContact: student.parentEmail!,
        message: `Manual update: Your child ${student.name} currently has ${student.attendance}% attendance and ${student.internalMarks}/20 in internals.`,
        timestamp: new Date().toISOString(),
        status: 'Sent'
      };
      addNotification(log);
      setSendingEmail(null);
    }, 1000);
  };
  const [newStudent, setNewStudent] = React.useState({
    name: '',
    registerNumber: '',
    attendance: 75,
    internalMarks: 15,
    assignmentMarks: 8,
    previousSemesterMarks: 70,
    parentEmail: '',
    parentPhone: ''
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const student: Student = {
      id: Math.random().toString(36).substr(2, 9),
      ...newStudent,
      parentEmail: newStudent.parentEmail || `${newStudent.name.toLowerCase().replace(' ', '.')}@example.com`,
      parentPhone: newStudent.parentPhone || '+1234567890'
    };
    setStudents(prev => [...prev, student]);
    setShowAddForm(false);
    setNewStudent({
      name: '',
      registerNumber: '',
      attendance: 75,
      internalMarks: 15,
      assignmentMarks: 8,
      previousSemesterMarks: 70,
      parentEmail: '',
      parentPhone: ''
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const rows = text.split('\n').filter(row => row.trim() !== '');
      const headers = rows[0].split(',').map(h => h.trim());

      const requiredHeaders = ['Student_Name', 'Register_Number', 'Attendance', 'Internal_Marks', 'Assignment_Marks', 'Previous_Semester_Marks'];
      const missing = requiredHeaders.filter(h => !headers.includes(h));

      if (missing.length > 0) {
        alert(`Missing columns: ${missing.join(', ')}`);
        return;
      }

      const newStudents: Student[] = rows.slice(1).map((row, index) => {
        const values = row.split(',').map(v => v.trim());
        const data: any = {};
        headers.forEach((h, i) => data[h] = values[i]);

        return {
          id: Math.random().toString(36).substr(2, 9),
          name: data.Student_Name,
          registerNumber: data.Register_Number,
          attendance: parseFloat(data.Attendance),
          internalMarks: parseFloat(data.Internal_Marks),
          assignmentMarks: parseFloat(data.Assignment_Marks),
          previousSemesterMarks: parseFloat(data.Previous_Semester_Marks),
          parentEmail: data.Parent_Email || `${data.Student_Name.toLowerCase().replace(' ', '.')}@example.com`,
          parentPhone: data.Parent_Phone || '+1234567890'
        };
      });

      setStudents(prev => [...prev, ...newStudents]);
    };
    reader.readAsText(file);
  };

  const downloadTemplate = () => {
    const headers = "Student_Name,Register_Number,Attendance,Internal_Marks,Assignment_Marks,Previous_Semester_Marks,Parent_Email,Parent_Phone\n";
    const sample = "John Doe,REG001,85,15,8,75,parent@example.com,+1234567890\nJane Smith,REG002,65,12,7,60,parent2@example.com,+0987654321";
    const blob = new Blob([headers + sample], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_template.csv';
    a.click();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Data</h1>
          <p className="text-gray-400">Upload and manage student records for analysis.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium"
          >
            <Users size={18} />
            Add Student
          </button>
          <button 
            onClick={downloadTemplate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium"
          >
            <Download size={18} />
            Template
          </button>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 transition-all text-sm font-bold shadow-lg shadow-primary/20"
          >
            <Upload size={18} />
            Upload CSV
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept=".csv" 
            className="hidden" 
          />
        </div>
      </header>

      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-dark w-full max-w-2xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
                <h2 className="text-2xl font-bold">Add New Student</h2>
                <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleAddStudent} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Student Name</label>
                    <input 
                      required
                      type="text" 
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Register Number</label>
                    <input 
                      required
                      type="text" 
                      value={newStudent.registerNumber}
                      onChange={(e) => setNewStudent({...newStudent, registerNumber: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="e.g. REG001"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Attendance (%)</label>
                    <input 
                      required
                      type="number" 
                      min="0"
                      max="100"
                      value={newStudent.attendance}
                      onChange={(e) => setNewStudent({...newStudent, attendance: parseFloat(e.target.value)})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Internal Marks (0-20)</label>
                    <input 
                      required
                      type="number" 
                      min="0"
                      max="20"
                      value={newStudent.internalMarks}
                      onChange={(e) => setNewStudent({...newStudent, internalMarks: parseFloat(e.target.value)})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Assignment Marks (0-10)</label>
                    <input 
                      required
                      type="number" 
                      min="0"
                      max="10"
                      value={newStudent.assignmentMarks}
                      onChange={(e) => setNewStudent({...newStudent, assignmentMarks: parseFloat(e.target.value)})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Prev Sem Marks (0-100)</label>
                    <input 
                      required
                      type="number" 
                      min="0"
                      max="100"
                      value={newStudent.previousSemesterMarks}
                      onChange={(e) => setNewStudent({...newStudent, previousSemesterMarks: parseFloat(e.target.value)})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Parent Email</label>
                    <input 
                      type="email" 
                      value={newStudent.parentEmail}
                      onChange={(e) => setNewStudent({...newStudent, parentEmail: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="parent@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Parent Phone</label>
                    <input 
                      type="tel" 
                      value={newStudent.parentPhone}
                      onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="+1234567890"
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    Save Student
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {editingStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-dark w-full max-w-2xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
                <h2 className="text-2xl font-bold">Edit Student Details</h2>
                <button onClick={() => setEditingStudent(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleEditStudent} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Student Name</label>
                    <input 
                      required
                      type="text" 
                      value={editingStudent.name}
                      onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Register Number</label>
                    <input 
                      required
                      type="text" 
                      value={editingStudent.registerNumber}
                      onChange={(e) => setEditingStudent({...editingStudent, registerNumber: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Attendance (%)</label>
                    <input 
                      required
                      type="number" 
                      min="0"
                      max="100"
                      value={editingStudent.attendance}
                      onChange={(e) => setEditingStudent({...editingStudent, attendance: parseFloat(e.target.value)})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Internal Marks (0-20)</label>
                    <input 
                      required
                      type="number" 
                      min="0"
                      max="20"
                      value={editingStudent.internalMarks}
                      onChange={(e) => setEditingStudent({...editingStudent, internalMarks: parseFloat(e.target.value)})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Assignment Marks (0-10)</label>
                    <input 
                      required
                      type="number" 
                      min="0"
                      max="10"
                      value={editingStudent.assignmentMarks}
                      onChange={(e) => setEditingStudent({...editingStudent, assignmentMarks: parseFloat(e.target.value)})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Prev Sem Marks (0-100)</label>
                    <input 
                      required
                      type="number" 
                      min="0"
                      max="100"
                      value={editingStudent.previousSemesterMarks}
                      onChange={(e) => setEditingStudent({...editingStudent, previousSemesterMarks: parseFloat(e.target.value)})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Parent Email</label>
                    <input 
                      type="email" 
                      value={editingStudent.parentEmail || ''}
                      onChange={(e) => setEditingStudent({...editingStudent, parentEmail: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 font-medium">Parent Phone</label>
                    <input 
                      type="tel" 
                      value={editingStudent.parentPhone || ''}
                      onChange={(e) => setEditingStudent({...editingStudent, parentPhone: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setEditingStudent(null)}
                    className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    Update Student
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {students.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-dark border-2 border-dashed border-white/10 rounded-[2.5rem] p-20 text-center space-y-6"
        >
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <FileSpreadsheet size={48} className="text-gray-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">No Student Data Found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Upload a CSV file containing student names, register numbers, and academic metrics to get started.
            </p>
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all"
          >
            Browse Files
          </button>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-dark p-4 rounded-2xl border border-white/10">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Total Students</p>
              <p className="text-2xl font-bold">{students.length}</p>
            </div>
            <div className="glass-dark p-4 rounded-2xl border border-white/10">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Avg Attendance</p>
              <p className="text-2xl font-bold">
                {(students.reduce((acc, s) => acc + s.attendance, 0) / students.length).toFixed(1)}%
              </p>
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by name or register number..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <button 
                onClick={() => setStudents([])}
                className="p-3 bg-rose-500/10 text-rose-500 rounded-2xl border border-rose-500/20 hover:bg-rose-500/20 transition-all"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark rounded-[2rem] border border-white/10 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-5 font-bold">Student Name</th>
                    <th className="px-6 py-5 font-bold">Reg Number</th>
                    <th className="px-6 py-5 font-bold text-center">Attendance</th>
                    <th className="px-6 py-5 font-bold text-center">Internals</th>
                    <th className="px-6 py-5 font-bold text-center">Assignments</th>
                    <th className="px-6 py-5 font-bold text-center">Prev Sem</th>
                    <th className="px-6 py-5 font-bold">Parent Email</th>
                    <th className="px-6 py-5 font-bold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                            {student.name[0]}
                          </div>
                          <span className="font-semibold">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 font-mono text-sm">{student.registerNumber}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className={`font-bold ${student.attendance < 75 ? 'text-rose-500' : 'text-emerald-500'}`}>
                            {student.attendance}%
                          </span>
                          <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${student.attendance < 75 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                              style={{ width: `${student.attendance}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-gray-300">{student.internalMarks}/20</td>
                      <td className="px-6 py-4 text-center font-bold text-gray-300">{student.assignmentMarks}/10</td>
                      <td className="px-6 py-4 text-center font-bold text-gray-300">{student.previousSemesterMarks}/100</td>
                      <td className="px-6 py-4 text-gray-400 text-sm italic">{student.parentEmail}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => setEditingStudent(student)}
                            className="p-2 rounded-xl bg-white/5 text-gray-400 hover:bg-primary/20 hover:text-primary transition-all"
                            title="Edit Student"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleSendEmail(student)}
                            disabled={sendingEmail === student.id || !student.parentEmail}
                            className={`p-2 rounded-xl transition-all ${
                              sendingEmail === student.id 
                                ? 'bg-primary/20 text-primary animate-pulse' 
                                : 'bg-white/5 text-gray-400 hover:bg-primary/20 hover:text-primary'
                            }`}
                            title="Send Email to Parent"
                          >
                            <Mail size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StudentDataPage;
