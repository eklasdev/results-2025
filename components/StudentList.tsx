import React from 'react';
import type { ResultData } from '../types';

interface StudentListProps {
  students: ResultData[];
  onSelectStudent: (student: ResultData) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onSelectStudent }) => {
  if (students.length === 0) {
      return <div className="text-center text-gray-500 mt-8 text-xl">No students found.</div>;
  }

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <ul className="divide-y divide-gray-200">
            {students.map((student) => (
            <li 
                key={student.data.studentInfo.roll_no} 
                onClick={() => onSelectStudent(student)}
                className="p-6 hover:bg-green-50 transition-colors duration-200 cursor-pointer"
            >
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-xl font-semibold text-green-800">{student.data.studentInfo.name}</p>
                        <p className="text-sm text-gray-600">Roll: {student.data.studentInfo.roll_no} | Reg: {student.data.studentInfo.reg_no}</p>
                        <p className="text-sm text-gray-500 mt-1">{student.data.studentInfo.trade}</p>
                    </div>
                    <div className="text-right">
                        <p className={`text-lg font-bold ${student.data.studentInfo.result === 'PASS' ? 'text-green-600' : 'text-red-600'}`}>
                            {student.data.studentInfo.result}
                        </p>
                        <p className="text-md text-gray-700">GPA: {student.data.studentInfo.gpa}</p>
                    </div>
                </div>
            </li>
            ))}
        </ul>
    </div>
  );
};

export default StudentList;
