export const universityColumns = [
    "Name", "Departments", "Instructors", "Courses", "Total Students", "Enrolled Student", "Status", "Action"
];

export type University = {
    originalName?: string;
    name: string;
    departments: number;
    instructors: number;
    courses: number;
    totalStudents: number;
    enrolledStudents: number;
    status: "Active" | "Inactive";
    logo?: string; // Optional logo property
};

export const universityData: University[] = [
    {
      name: "ABC University",
      departments: 8,
      instructors: 10,
      courses: 19,
      totalStudents: 200,
      enrolledStudents: 150,
      status: "Active",
    },
    {
      name: "XYZ University",
      departments: 5,
      instructors: 7,
      courses: 12,
      totalStudents: 120,
      enrolledStudents: 90,
      status: "Inactive",
    },
    {
        name: "Kuwait University",
        departments: 12,
        instructors: 50,
        courses: 100,
        totalStudents: 1500,
        enrolledStudents: 1200,
        status: "Active",
    },
    {
        name: "American University of Kuwait",
        departments: 6,
        instructors: 25,
        courses: 60,
        totalStudents: 800,
        enrolledStudents: 650,
        status: "Inactive",
    },
    {
        name: "Gulf University for Science and Technology",
        departments: 7,
        instructors: 30,
        courses: 70,
        totalStudents: 900,
        enrolledStudents: 750,
        status: "Active",
    },
]; 