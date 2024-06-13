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
  