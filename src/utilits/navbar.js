import AddCourses from "../components/AddCourses";
import AddLessons from "../components/AddLessons";
import AddSections from "../components/AddSections";
import AllCourse from "../components/AllCourse";
import Dashboard from "../components/Dashboard";
import Test from "../components/Test";

export const data = [
  {
    id: 1,
    title: "Dashboard",
    path: "/",
    Component: Dashboard,
  },
  {
    id: 20,
    title: "All Courses",
    path: "/all-courses",
    Component: AllCourse,
  },
  {
    id: 2,
    title: "Add Courses",
    path: "/add-courses",
    Component: AddCourses,
  },
  {
    id: 3,
    title: "Add Sections",
    path: "/add-sections",
    Component: AddSections,
  },

  {
    id: 4,
    title: "Add Lessons",
    path: "/add-lessons",
    Component: AddLessons,
  },
  // {
  //   id: 31,
  //   title: "Add Test",
  //   path: "/add-test",
  //   Component: Test,
  // },
];
