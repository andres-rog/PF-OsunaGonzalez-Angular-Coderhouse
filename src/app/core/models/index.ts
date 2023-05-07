export interface User {
    id: number;
    firstName1: string;
    firstName2: string;
    lastName1: string;
    lastName2: string;
    title: string;
    role: string;
    email: string;
    token: string;
    register_date: Date;
  }

  export interface Student {
    id: number;
    firstName1: string;
    firstName2: string;
    lastName1: string;
    lastName2: string;
    phone: string;
    email: string;
    register_date: Date;
  }

  export interface ClassSubject {
    id: number;
    title: string;
    timePerClass: string;
    totalClasses: number;
    classesPerWeek: number;
    difficulty: string;
  }

  export interface Enroll {
    id: number;
    studentName: string;
    subjectName: string;
    enrollDate: Date;
    startDate: Date;
    endDate: Date;
    weekDays: string;
    startHour: string;
    endHour: string;
    cost: number;
  }
