// src/types.ts

export type RootStackParamList = {
  Home: {role: string, username: string};
  Details: { student: Student, role: string, username: string};
  Allocate: { student: Student };
  Login: {role: string};
  Signup: undefined;
  RoleForLogin: undefined;
  Admin: undefined;
  OTPChange: {email: string, username: string};
};

export interface Student {
  ID: any;
  FirstName: string;
  LastName: string;
  academicYear: string;
  type: string;
  class: string;
  section: string;
  fathersName: string;
  hostelName?: string;
}
