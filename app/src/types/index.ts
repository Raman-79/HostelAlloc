// types.ts
export type RootStackParamList = {
    Home: undefined;
    Details: {
      student: {
        name: string;
        academicYear: string;
        type: string;
        class: string;
        section: string;
        fathersName: string;
      };
    };
  };
export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  academicYear: string;
  type: string;
  class: string;
  section: string;
  fathersName: string;
}
  