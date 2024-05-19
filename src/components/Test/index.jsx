import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Wrap } from "../AddCourses/style";
import { message } from "antd";

export default function Test() {
  const [, setSection] = useState();
  const [courses, setCourses] = useState([]);

  const formSchema = Yup.object().shape({
    title: Yup.string().required("Title Required"),
    // course_id: Yup.string().required('Choose Course'),
    // section_id: Yup.string().required('Choose Section'),
    answers: Yup.string().required("Required"),
  });
  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await fetch(`${url}lesson`, {
        method: "POST",
        body: values,
      });
      message.success("Test created");

      resetForm();
    } catch (error) {
      console.log(error);
    }
  };
  const url = process.env.REACT_APP_URL;

  useEffect(() => {
    fetch(`${url}courses`)
      .then((res) => res.json())
      .then((res) => setCourses(res))
      .catch((err) => console.log(err));
  }, [url]);
  const handleAnswers = (type, setFieldValue, value) => {
    let ans = ["a", "b", "c", "d"];
    ans.forEach((a) => {
      if (a === type) {
        setFieldValue(
          `answers.${type}.isCorrect`,
          value?.target?.value === "on"
        );
      } else {
        setFieldValue(`answers.${a}.isCorrect`, false);
      }
    });
  };

  return (
    <Wrap>
      <Wrap.Card>
        <Wrap.Header>
          <div> Add Test</div>
        </Wrap.Header>
        <Wrap.CardBody>
          <Formik
            initialValues={{
              // course_id: '',
              // section_id: '',
              title: "",
              answers: {
                a: { title: "", isCorrect: false },
                b: { title: "", isCorrect: false },
                c: { title: "", isCorrect: false },
                d: { title: "", isCorrect: false },
              },
            }}
            validationSchema={formSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, errors, touched, setFieldValue, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Wrap.FormGroup className="my-3">
                  <label htmlFor="module_id">Select Course</label>
                  <Field
                    as="select"
                    name="course_id"
                    // required
                    id="course_id"
                    required
                    className={`form-control ${
                      errors.module_id && touched.module_id && "is-invalid"
                    }`}
                    onChange={(v) => {
                      setFieldValue("course_id", v?.target?.value);
                      setSection(
                        ...courses?.filter((o) => o?.id === v?.target?.value)
                      );
                    }}
                  >
                    <option value="">Select Course</option>

                    {courses?.map((option) => (
                      <option value={option?.id}>{option?.title}</option>
                    ))}
                  </Field>
                  {errors.course_id && touched.course_id ? (
                    <div className="invalid-tooltip mt-25">
                      {errors.course_id}
                    </div>
                  ) : null}
                </Wrap.FormGroup>

                {/* <Modal isOpen={modal} toggle={toggle} centered={true}></Modal> */}

                <Wrap.FormGroup className="my-3">
                  <label htmlFor="title">Enter Your Question</label>
                  <Field
                    as="textarea"
                    name="title"
                    required
                    id="title"
                    className={`form-control ${
                      errors.title && touched.title && "is-invalid"
                    }`}
                  />
                  {errors.title && touched.title ? (
                    <div className="invalid-tooltip mt-25">{errors.title}</div>
                  ) : null}
                </Wrap.FormGroup>
                <ol
                  style={{
                    listStyle: "none",
                    padding: "0",
                    marginBottom: "20px",
                  }}
                >
                  <li style={{ display: "flex", margin: "10px 0  0 0" }}>
                    <input
                      type="radio"
                      name="isCorrect"
                      required
                      style={{ width: "25px", margin: "0 10px 0 0" }}
                      className={`form-control`}
                      onChange={(v) => handleAnswers("a", setFieldValue, v)}
                    />
                    <input
                      type="text"
                      placeholder="Enter your answer"
                      id="answers"
                      required
                      name="answers.a.title"
                      className={`form-control `}
                      onChange={(v) =>
                        setFieldValue("answers.a.title", v?.target?.value)
                      }
                    />
                  </li>
                  <li style={{ display: "flex", margin: "10px 0  0 0" }}>
                    <input
                      type="radio"
                      name="isCorrect"
                      required
                      style={{ width: "25px", margin: "0 10px 0 0" }}
                      className={`form-control`}
                      onChange={(v) => handleAnswers("b", setFieldValue, v)}
                    />
                    <input
                      type="text"
                      placeholder="Enter your answer"
                      id="answers"
                      required
                      name="answers.b.title"
                      className={`form-control `}
                      onChange={(v) =>
                        setFieldValue("answers.b.title", v?.target?.value)
                      }
                    />
                  </li>
                  <li style={{ display: "flex", margin: "10px 0  0 0" }}>
                    <input
                      type="radio"
                      name="isCorrect"
                      required
                      style={{ width: "25px", margin: "0 10px 0 0" }}
                      className={`form-control`}
                      onChange={(v) => handleAnswers("c", setFieldValue, v)}
                    />
                    <input
                      type="text"
                      placeholder="Enter your answer"
                      id="answers"
                      required
                      name="answers.c.title"
                      className={`form-control `}
                      onChange={(v) =>
                        setFieldValue("answers.c.title", v?.target?.value)
                      }
                    />
                  </li>
                  <li style={{ display: "flex", margin: "10px 0  0 0" }}>
                    <input
                      type="radio"
                      name="isCorrect"
                      required
                      style={{ width: "25px", margin: "0 10px 0 0" }}
                      className={`form-control`}
                      onChange={(v) => handleAnswers("d", setFieldValue, v)}
                    />
                    <input
                      type="text"
                      placeholder="Enter your answer"
                      id="answers"
                      required
                      name="answers.d.title"
                      className={`form-control `}
                      onChange={(v) =>
                        setFieldValue("answers.d.title", v?.target?.value)
                      }
                    />
                  </li>
                </ol>

                <button className="btn-primary" type="submit">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </Wrap.CardBody>
      </Wrap.Card>
    </Wrap>
  );
}
