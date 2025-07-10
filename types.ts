export interface Grade {
  code: string;
  subject: string;
  obtainMark: string;
  fullMark: string;
  grade: string;
}

export interface StudentInfo {
  roll_no: string;
  name: string;
  reg_no: string;
  fathers_name: string;
  trade: string;
  mothers_name: string;
  type: string;
  "date_of birth": string;
  result: string;
  session: string;
  gpa: string;
  institute: string;
}

export interface ResultData {
  status: string;
  data: {
    studentInfo: StudentInfo;
    gradeSheet: Grade[];
    optionalSubject: Grade | null;
  };
}
