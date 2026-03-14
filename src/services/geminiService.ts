import { GoogleGenAI } from "@google/genai";
import { Student } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const predictPerformance = async (student: Student) => {
  try {
    const prompt = `Analyze this student's performance and predict their final score (0-100).
    Student Data:
    - Attendance: ${student.attendance}%
    - Internal Marks: ${student.internalMarks}/20
    - Assignment Marks: ${student.assignmentMarks}/10
    - Previous Semester Marks: ${student.previousSemesterMarks}/100

    Return a JSON object with:
    - predictedScore: number
    - riskLevel: "Safe" | "Medium" | "High"
    - recommendations: string[] (at least 3 specific, actionable performance improvement suggestions)
    - parentMessage: string (a supportive message for the parent about the student's status)
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text || "{}");
    return result;
  } catch (error) {
    console.error("Prediction error:", error);
    // Fallback logic
    const score = (student.attendance * 0.3) + (student.internalMarks * 2) + (student.assignmentMarks * 1) + (student.previousSemesterMarks * 0.4);
    const risk = score > 60 ? "Safe" : score > 40 ? "Medium" : "High";
    return {
      predictedScore: Math.min(100, Math.round(score)),
      riskLevel: risk,
      recommendations: ["Attend more classes", "Focus on internal tests", "Complete all assignments"],
      parentMessage: `Your child's performance is currently ${risk}. Please encourage them to focus on their studies.`
    };
  }
};
