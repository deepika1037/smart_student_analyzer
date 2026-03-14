export type Role = 'Admin' | 'Faculty' | 'Student';

export interface Student {
  id: string;
  name: string;
  registerNumber: string;
  attendance: number;
  internalMarks: number;
  assignmentMarks: number;
  previousSemesterMarks: number;
  parentEmail?: string;
  parentPhone?: string;
  predictedScore?: number;
  riskLevel?: 'Safe' | 'Medium' | 'High';
  recommendations?: string[];
}

export interface NotificationLog {
  id: string;
  studentName: string;
  parentContact: string;
  message: string;
  timestamp: string;
  status: 'Sent' | 'Failed';
}

export interface User {
  username: string;
  role: Role;
}
