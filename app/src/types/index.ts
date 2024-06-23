// src/types.ts

export type RootStackParamList = {
  Home: undefined;
  Details: { student: Student };
  Allocate: { student: Student };
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
