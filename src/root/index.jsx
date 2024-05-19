import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";
import { data } from "../utilits/navbar";
import Course from "../components/AllCourse/Course";
import Login from "../components/Login";
import Register from "../components/Register";
const Root = () => {
  // useEffect(() => {
  //   navigate(token ? "/" : "/login");
  //   // eslint-disable-next-line
  // }, [token]);
  return (
    <Routes>
      <Route element={<Sidebar />}>
        {data?.map(({ id, path, Component }) => (
          <Route key={id} path={path} element={<Component />} />
        ))}
        <Route path="/" element={<Dashboard />} />
        <Route path="all-courses/:courseId" element={<Course />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path={"*"} element={<div>you are lost</div>} />
    </Routes>
  );
};

export default Root;
