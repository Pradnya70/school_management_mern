import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import School from "./school/School";
import Attendance from "./school/components/attendance/Attendance";
import Class from "./school/components/class/Class";
import Dashboard from "./school/components/dashboard/Dashboard";
import Examinations from "./school/components/examinations/Examinations";
import Notice from "./school/components/notice/Notice";
import Schedule from "./school/components/schedule/Schedule";
import Students from "./school/components/students/Students";
import Subjects from "./school/components/subjects/Subjects";
import Teachers from "./school/components/teachers/Teachers";

import Client from "./client/Client";
import Login from "./client/components/login/Login";
import Register from "./client/components/register/Register";
import Home from "./client/components/home/Home";

import Teacher from "./teacher/Teacher";
import TeacherDetails from "./teacher/components/teacher details/TeacherDetails";
import ScheduleTeacher from "./teacher/components/schedule/ScheduleTeacher";
import AttendanceTeacher from "./teacher/components/attendance/AttendanceTeacher";
import ExaminationsTeacher from "./teacher/components/examinations/ExaminationsTeacher";
import NoticeTeacher from "./teacher/components/notice/NoticeTeacher";

import Student from "./student/Student";
import StudentDetails from "./student/components/student details/StudentDetails";
import ScheduleStudent from "./student/components/schedule/ScheduleStudent";
import AttendanceStudent from "./student/components/attendance/AttendanceStudent";
import ExaminationsStudent from "./student/components/examinations/ExaminationsStudent";
import NoticeStudent from "./student/components/notice/NoticeStudent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* school route */}
          <Route path="school" element={<School />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="class" element={<Class />} />
            <Route path="subjects" element={<Subjects/>} />
            <Route path="examinations" element={<Examinations />} />
            <Route path="notice" element={<Notice />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="students" element={<Students />} />
            <Route path="teachers" element={<Teachers />} />
          </Route>


          {/* student */}
          <Route path="student" element={<Student/>}>
            <Route index element={<StudentDetails/>} />
            <Route path="schedule" element={<ScheduleStudent/>} />
            <Route path="attendance" element={<AttendanceStudent/>} />
            <Route path="examinations" element={<ExaminationsStudent/>} />
            <Route path="notice" element={<NoticeStudent/>} />
          </Route>


          {/* teacher  */}
          <Route path="teacher" element={<Teacher/>}>
            <Route index element={<TeacherDetails/>} />
            <Route path="schedule" element={<ScheduleTeacher/>} />
            <Route path="attendance" element={<AttendanceTeacher/>} />
            <Route path="examinations" element={<ExaminationsTeacher/>} />
            <Route path="notice" element={<NoticeTeacher/>} />
          </Route>


          {/* client */}
          <Route path="" element={<Client />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
