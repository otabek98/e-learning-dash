import React from "react";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useEffect } from "react";
import { Wrap } from "../AddCourses/style";
import { message } from "antd";
import useRequest from "../../hooks/useRequest.js";

const formSchema = Yup.object().shape({
  title: Yup.string().required("Title Required"),
  course_id: Yup.string().required("Choose Course"),
  section_id: Yup.string().required("Choose Module"),
  video: Yup.string().required("Required"),
  sub_title: Yup.string().required("Required"),
});

export default function AddLessons() {
  const { request } = useRequest();
  const [video, setVideo] = useState();
  const url = process.env.REACT_APP_URL;

  const [courses, setCourses] = useState([]);
  const [section, setSection] = useState([]);
  useEffect(() => {
    request({ url: "course/getAllCourses" })
      .then((res) => setCourses(res))
      .catch((err) => console.log(err));
  }, [url]);
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    // formData.append("course_id", values.course_id);
    // formData.append("section_id", values.section_id);
    // formData.append("title", values.title);
    // formData.append("sub_title", values.sub_title);
    formData.append("filename", values.video);
    try {
      const { downloadURL } = await request({
        url: "fileUpload",
        method: "post",
        data: formData,
      });
      await request({
        url: "lesson",
        method: "post",
        data: { video_url: downloadURL, ...values },
      }).then((res) => {
        message.success(res?.message);
      });

      resetForm();
      setVideo();
    } catch (error) {
      console.log("Something went wrong", error);
    }
    setSubmitting(false);
  };
  const handleSection = (v) => {
    const course_id = v.target.value;
    request({
      url: `section/${course_id}`,
    }).then((res) => setSection(res));
  };
  return (
    <Wrap>
      <Wrap.Card>
        <Wrap.Header>
          <div> Add Lessons</div>
        </Wrap.Header>
        <Wrap.CardBody>
          <Formik
            initialValues={{
              course_id: "",
              section_id: "",
              title: "",
              sub_title: "",
              video: "",
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Wrap.FormGroup className="my-3">
                  <label for="section_id">Select Course</label>
                  <Field
                    as="select"
                    name="course_id"
                    required
                    id="course_id"
                    className={`form-control ${
                      errors.course_id && touched.course_id && "is-invalid"
                    }`}
                    onChange={(v) => {
                      setFieldValue("course_id", v.target.value);
                      handleSection(v);
                    }}
                  >
                    <option value="">Select Course</option>

                    {courses?.map((option) => (
                      <option value={option?._id}>{option?.title}</option>
                    ))}
                  </Field>
                  {errors.course_id && touched.course_id ? (
                    <div className="invalid-tooltip mt-25">
                      {errors.course_id}
                    </div>
                  ) : null}
                </Wrap.FormGroup>
                <Wrap.FormGroup className="my-3">
                  <label for="section_id">Select Section</label>
                  <Field
                    as="select"
                    name="section_id"
                    required
                    id="section_id"
                    className={`form-control ${
                      errors.section_id && touched.section_id && "is-invalid"
                    }`}
                  >
                    <option value="">Select Section</option>

                    {section?.map((option) => (
                      <option value={option?._id}>{option?.title}</option>
                    ))}
                  </Field>
                  {errors.section_id && touched.section_id ? (
                    <div className="invalid-tooltip mt-25">
                      {errors.section_id}
                    </div>
                  ) : null}
                </Wrap.FormGroup>
                <Wrap.FormGroup className="my-3">
                  <label for="title">Lesson Title</label>
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
                  <label for="subtitle">Lesson Subtitle</label>
                  <Field
                    type="textarea"
                    name="sub_title"
                    required
                    id="sub_title"
                    className={`form-control ${
                      errors.sub_title && touched.sub_title && "is-invalid"
                    }`}
                  />
                  {errors.sub_title && touched.sub_title ? (
                    <div className="invalid-tooltip mt-25">
                      {errors.sub_title}
                    </div>
                  ) : null}
                </Wrap.FormGroup>
                <Wrap.FormGroup className="my-3">
                  {values.video?.length <= 0 ? (
                    <label
                      className="btn btn-primary"
                      htmlFor="upload-video"
                      color="primary"
                    >
                      Upload Video
                      <Field
                        name="video"
                        type="file"
                        id="upload-video"
                        hidden
                        required
                        accept=".mp4"
                        onChange={(event) => {
                          setFieldValue("video", event.currentTarget.files[0]);
                          setVideo(URL.createObjectURL(event.target.files[0]));
                        }}
                      />
                    </label>
                  ) : null}
                  {video?.length ? (
                    <>
                      <video
                        controls
                        autoPlay
                        muted
                        className="img-fluid"
                        src={video}
                        alt={values.name}
                        style={{ maxHeight: "400px", height: "100%" }}
                      />
                      <div className="upload-wrap">
                        <label
                          className="btn btn-flat-primary"
                          htmlFor="update-video"
                          color="primary"
                        >
                          Upload Video
                          <input
                            type="file"
                            id="update-video"
                            hidden
                            onChange={(event) => {
                              setFieldValue(
                                "video",
                                event.currentTarget.files[0]
                              );
                              setVideo(
                                URL.createObjectURL(event.target.files[0])
                              );
                            }}
                          />
                        </label>
                        <button
                          className="flat-danger"
                          onClick={() => {
                            setFieldValue("video", "");
                            setVideo("");
                          }}
                        >
                          Remove Video
                        </button>
                      </div>
                    </>
                  ) : null}
                  {errors.video && touched.video ? (
                    <div className="invalid-tooltip mt-25">{errors.video}</div>
                  ) : null}
                </Wrap.FormGroup>
                <button
                  className="btn-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
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
