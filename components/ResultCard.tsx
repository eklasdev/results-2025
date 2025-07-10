import React from 'react';
import type { ResultData, Grade } from '../types';

interface ResultCardProps {
  resultData: ResultData;
  onBack: () => void;
}

const InfoItem: React.FC<{ label: string; value: string | number; isHighlight?: boolean }> = ({ label, value, isHighlight = false }) => (
    <div className="flex flex-col">
        <span className="text-xs text-gray-500 uppercase font-medium">{label}</span>
        <span className={`text-md sm:text-lg font-semibold ${isHighlight ? 'text-indigo-600' : 'text-gray-900'}`}>{value}</span>
    </div>
);

const ResultCard: React.FC<ResultCardProps> = ({ resultData, onBack }) => {
  const { studentInfo, gradeSheet, optionalSubject } = resultData.data;

  const resultColorClass = studentInfo.result === 'PASS' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10 animate-fade-in">
        
        {/* Card Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start pb-6 border-b border-gray-200 mb-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Student Mark Sheet</h1>
                <p className="text-sm text-gray-500 mt-1">Secondary School Certificate (Vocational) Result</p>
            </div>
            <button 
                onClick={onBack}
                className="mt-4 sm:mt-0 whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to Search
            </button>
        </header>

        {/* Student Info Section */}
        <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Student Information</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-5 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <InfoItem label="Name" value={studentInfo.name} />
                <InfoItem label="Roll No" value={studentInfo.roll_no} />
                <InfoItem label="Registration No" value={studentInfo.reg_no} />
                <InfoItem label="Session" value={studentInfo.session} />
                <InfoItem label="Father's Name" value={studentInfo.fathers_name} />
                <InfoItem label="Mother's Name" value={studentInfo.mothers_name} />
                <InfoItem label="Institute" value={studentInfo.institute} />
                <InfoItem label="Trade" value={studentInfo.trade} />
                <InfoItem label="Date of Birth" value={studentInfo['date_of birth']} />
                <InfoItem label="Type" value={studentInfo.type} />
                <div className="col-span-1">
                    <span className="text-xs text-gray-500 uppercase font-medium">Result</span>
                    <span className={`text-lg font-bold px-3 py-1 rounded-full inline-block mt-1 ${resultColorClass}`}>{studentInfo.result}</span>
                </div>
                <InfoItem label="GPA" value={studentInfo.gpa} isHighlight={true} />
            </div>
        </section>

        {/* Grade Sheet Table */}
        <section>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Grade Sheet</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-800 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-bold">Code</th>
                            <th scope="col" className="px-6 py-3 font-bold">Subject</th>
                            <th scope="col" className="px-6 py-3 font-bold text-center">Obtained Mark</th>
                            <th scope="col" className="px-6 py-3 font-bold text-center">Full Mark</th>
                            <th scope="col" className="px-6 py-3 font-bold text-center">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gradeSheet.map((grade, index) => (
                            <tr key={grade.code} className="bg-white border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
                                <td className="px-6 py-4 font-mono">{grade.code}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{grade.subject}</td>
                                <td className="px-6 py-4 text-center">{grade.obtainMark}</td>
                                <td className="px-6 py-4 text-center">{grade.fullMark}</td>
                                <td className="px-6 py-4 text-center font-bold text-indigo-600">{grade.grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
        
        {/* Optional Subject Table */}
        {optionalSubject && (
            <section className="mt-8">
                <h3 className="text-lg font-bold text-gray-700 mb-4">Optional Subject</h3>
                 <div className="overflow-x-auto rounded-lg border border-gray-200 bg-yellow-50 shadow-sm">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-xs text-gray-800 uppercase bg-yellow-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-bold">Code</th>
                                <th scope="col" className="px-6 py-3 font-bold">Subject</th>
                                <th scope="col" className="px-6 py-3 font-bold text-center">Obtained Mark</th>
                                <th scope="col" className="px-6 py-3 font-bold text-center">Full Mark</th>
                                <th scope="col" className="px-6 py-3 font-bold text-center">Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b last:border-b-0">
                                <td className="px-6 py-4 font-mono">{optionalSubject.code}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{optionalSubject.subject}</td>
                                <td className="px-6 py-4 text-center">{optionalSubject.obtainMark}</td>
                                <td className="px-6 py-4 text-center">{optionalSubject.fullMark}</td>
                                <td className="px-6 py-4 text-center font-bold text-indigo-600">{optionalSubject.grade}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        )}
    </div>
  );
};

export default ResultCard;