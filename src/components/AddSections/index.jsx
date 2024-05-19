import React, { useEffect, useState } from "react";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Wrap } from "../AddCourses/style";
import { message } from "antd";
import useRequest from "../../hooks/useRequest.js";

const formSchema = Yup.object().shape({
  title: Yup.string().required("Title Required"),
  course_id: Yup.string().required("Choose Course"),
  // description: Yup.string().required("Required Description"),
});

const url = process.env.REACT_APP_URL;
const AddSections = ({ modal }) => {
  const { request } = useRequest();
  const [courses, setCourses] = useState([]);
  const [prevData, setPrevData] = useState({});

  // 655cefe6a5173892608a070f
  useEffect(() => {
    request({
      url: "course/getAllCourses",
    }).then((res) => {
      setCourses(res);
    });
  }, []);
  const handleSubmit = (values, { resetForm }) => {
    request({
      url: "section",
      method: "post",
      data: values,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        message.success("Section created");
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Wrap>
      <Wrap.Card>
        <Wrap.Header>
          <div> Add Sections</div>
        </Wrap.Header>
        <Wrap.CardBody>
          <Formik
            initialValues={{
              course_id: "",
              title: "",
              description: "",
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, setFieldValue, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Wrap.FormGroup className="my-3">
                  <label for="course_id">Select Course</label>
                  <Field
                    as="select"
                    name="course_id"
                    required
                    id="course_id"
                    className={`form-control ${
                      errors.course_id && touched.course_id && "is-invalid"
                    }`}
                  >
                    <option value="">Select Course</option>
                    {courses?.map((item) => (
                      <option key={item?._id} value={item?._id}>
                        {item?.title}
                      </option>
                    ))}
                  </Field>
                  {errors.course_id && touched.course_id ? (
                    <div className="invalid-tooltip mt-25">
                      {errors.course_id}
                    </div>
                  ) : null}
                </Wrap.FormGroup>
                <Wrap.FormGroup className="my-3">
                  <label for="title">Section Title</label>
                  <Field
                    type="text"
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
                <Wrap.FormGroup className="my-3">
                  <label for="description">Section Description</label>
                  <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                    required
                    value={values?.description}
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                    className={`form-control ${
                      errors.description && touched.description && "is-invalid"
                    }`}
                  ></textarea>
                  {errors.description && touched.description ? (
                    <div className="invalid-tooltip mt-25">
                      {errors.description}
                    </div>
                  ) : null}
                </Wrap.FormGroup>
                <button className="btn-primary" color="primary" type="submit">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </Wrap.CardBody>
      </Wrap.Card>
    </Wrap>
  );
};

export default AddSections;
