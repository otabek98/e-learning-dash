import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress } from "@mui/material";
import { Container } from "../Register/style";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { AuthContext } from "../../context/Auth";
import useRequest from "../../hooks/useRequest";

const url = process.env.REACT_APP_URL;
const Login = () => {
  const [load, setLoad] = useState(false);
  // const [{ token }, dispatch] = useContext(AuthContext);
  const [, dispatch] = useContext(AuthContext);
  const { request } = useRequest();

  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const res = await request({
        url: "user/login",
        method: "post",
        data: values,
        includeToken: false,
      });

      if (res?.token) {
        message.success("Successfully Logged In!");
        dispatch({ type: "register", payload: res?.token });
        navigate("/");
      } else {
        message.error(res);
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("An error occurred while logging in. Please try again.");
    }
  };
  return (
    <Container>
      <Formik
        initialValues={{
          email: "",
          password: "",
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
            <Container.Title>Log In</Container.Title>
            <Container.Text>
              Welcome Back. Login to continue your learning.
            </Container.Text>
            <TextField
              id="outlined-password-input"
              label="Email"
              fullWidth
              type="text"
              autoComplete="current-email"
              sx={{ borderRadius: "8px" }}
              margin={"normal"}
              size="small"
              name="email"
              {...formik.getFieldProps("email")}
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
              size="small"
              margin={"normal"}
              name="password"
              {...formik.getFieldProps("password")}
            />
            <ErrorMessage name="password">
              {(msg) => (
                <div style={{ color: "red", fontSize: "12px" }}>
                  Password {msg}
                </div>
              )}
            </ErrorMessage>
            <div style={{ textAlign: "end" }}>
              <NavLink to="/register" style={{ color: "#6E3BA7" }}>
                Register
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
              {load ? <CircularProgress size={25} /> : <div>Login</div>}
            </Button>
          </Container.Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
