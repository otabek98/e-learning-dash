import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Container } from "./style";
import { NavLink, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import useRequest from "../../hooks/useRequest";
import { message } from "antd";

const Register = () => {
  const [load, setLoad] = useState(false);
  const { request } = useRequest();
  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm }) => {
    setLoad(true);
    request({
      url: "user/register",
      method: "post",
      data: values,
      includeToken: false,
    }).then((res) => {
      if (res?.token) {
        message.success("User Created!");
        navigate("/login");
      } else {
        message.error(res);
      }
      resetForm();
    });
    setLoad(false);
  };
  return (
    <Container>
      <Formik
        initialValues={{
          email: "",
          password: "",
          first_name: "",
          last_name: "",
          admin: true,
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(3, "Password should be of minimum 3 characters length")
            .required("Required"),
          email: Yup.string().email("Enter a valid email").required("Required"),
        })}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Container.Form onSubmit={formik.handleSubmit}>
            <Container.Title>Register</Container.Title>

            <TextField
              id="outlined-name-input"
              label="First Name"
              fullWidth
              type="text"
              autoComplete="current-name"
              size="small"
              margin={"normal"}
              name="first_name"
              {...formik.getFieldProps("first_name")}
            />
            <TextField
              id="outlined-name-input"
              label="Last Name"
              fullWidth
              type="text"
              autoComplete="current-name"
              size="small"
              margin={"normal"}
              name="last_name"
              {...formik.getFieldProps("last_name")}
            />
            <TextField
              id="outlined-email-input"
              label="Email"
              fullWidth
              type="email"
              autoComplete="current-email"
              {...formik.getFieldProps("email")}
              sx={{ borderRadius: "8px" }}
              margin={"normal"}
              size="small"
              name="email"
            />
            <ErrorMessage name="email">
              {(msg) => (
                <div style={{ color: "red", fontSize: "12px" }}>
                  Email {msg}
                </div>
              )}
            </ErrorMessage>
            <TextField
              id="outlined-password-input"
              label="Password"
              fullWidth
              type="password"
              autoComplete="current-password"
              {...formik.getFieldProps("password")}
              size="small"
              margin={"normal"}
              name="password"
            />
            <ErrorMessage name="password">
              {(msg) => (
                <div style={{ color: "red", fontSize: "12px" }}>
                  Password {msg}
                </div>
              )}
            </ErrorMessage>
            <div style={{ textAlign: "end" }}>
              <NavLink to="/login" style={{ color: "#6E3BA7" }}>
                LogIn
              </NavLink>
            </div>
            <Button
              variant="contained"
              type="submit"
              sx={{
                maxWidth: "300px",
                width: "100%",
                display: "block",
                margin: "20px auto",
                background: "#6E3BA7",
              }}
            >
              {load ? <CircularProgress size={25} /> : <div>Register</div>}
            </Button>
          </Container.Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
