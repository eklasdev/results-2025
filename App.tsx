import React, { useState, useMemo } from 'react';
import { studentData as allStudentData } from './data/studentData';
import type { ResultData } from './types';
import SearchBar from './components/SearchBar';
import StudentList from './components/StudentList';
import ResultCard from './components/ResultCard';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<ResultData | null>(null);
  const [sortOrder, setSortOrder] = useState<'default' | 'gpa-desc'>('default');

  const stats = useMemo(() => {
    const passCount = allStudentData.filter(s => s.data.studentInfo.result === 'PASS').length;
    const failCount = allStudentData.length - passCount;
    return { pass: passCount, fail: failCount, total: allStudentData.length };
  }, []);

  const processedStudents = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = searchQuery
      ? allStudentData.filter(student => {
          const { name, roll_no, reg_no, trade, fathers_name } = student.data.studentInfo;
          return (
            name.toLowerCase().includes(lowercasedQuery) ||
            roll_no.toLowerCase().includes(lowercasedQuery) ||
            reg_no.toLowerCase().includes(lowercasedQuery) ||
            trade.toLowerCase().includes(lowercasedQuery) ||
            fathers_name.toLowerCase().includes(lowercasedQuery)
          );
        })
      : allStudentData;

    if (sortOrder === 'gpa-desc') {
      return [...filtered].sort((a, b) => parseFloat(b.data.studentInfo.gpa) - parseFloat(a.data.studentInfo.gpa));
    }
    
    // Default sort by roll number
    return [...filtered].sort((a,b) => parseInt(a.data.studentInfo.roll_no) - parseInt(b.data.studentInfo.roll_no));
  }, [searchQuery, sortOrder]);

  const handleSelectStudent = (student: ResultData) => {
    setSelectedStudent(student);
  };

  const handleBack = () => {
    setSelectedStudent(null);
  };

  const toggleSort = () => {
    setSortOrder(prev => (prev === 'gpa-desc' ? 'default' : 'gpa-desc'));
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center p-4 sm:p-8 bg-gradient-to-br from-gray-50 to-gray-200"
    >
      <div className="w-full max-w-4xl">
        {selectedStudent ? (
          <ResultCard resultData={selectedStudent} onBack={handleBack} />
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 drop-shadow-md">Result Archive 2025 - (SSC-VOC) </h1>
              <p className="text-lg text-gray-600 mt-2">Find official results from the board </p>
              <p className="text-lg text-gray-600 mt-2">https://103.23.41.229/diplomaall/index.php/result-search</p>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                     <div className="flex items-center gap-2 sm:gap-4 text-sm">
                        <span className="font-semibold text-gray-600">Statistics:</span>
                        <span className="py-1 px-3 bg-green-100 text-green-800 rounded-full font-medium">Pass: {stats.pass}</span>
                        <span className="py-1 px-3 bg-red-100 text-red-800 rounded-full font-medium">Fail: {stats.fail}</span>
                        <span className="py-1 px-3 bg-blue-100 text-blue-800 rounded-full font-medium">Total: {stats.total}</span>
                    </div>
                     <button 
                        onClick={toggleSort}
                        className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                        {sortOrder === 'gpa-desc' ? 'Clear Sorting' : 'Rank by GPA (High to Low)'}
                    </button>
                </div>
            </div>

            <div className="flex justify-center">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
            <StudentList students={processedStudents} onSelectStudent={handleSelectStudent} />
          </>
        )}
      </div>
       <footer className="text-center text-xs text-gray-500 mt-auto py-4">
        powered by ksmp.pages.dev | maintain by eklas.tech
      </footer>
    </div>
  );
};

export default App;