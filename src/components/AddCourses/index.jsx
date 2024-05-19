import React, { useEffect, useState } from "react";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Wrap } from "./style.js";
import { Spin, message } from "antd";
import useRequest from "../../hooks/useRequest.js";

const formSchema = Yup.object().shape({
  title: Yup.string().required("Title Required"),
  sub_title: Yup.string().required("Subtitle Required"),
  price: Yup.number().required("Price Required"),
  description: Yup.string().required(" Description Required"),
  number_section: Yup.number().required("Required"),
  level: Yup.number().required("Required"),
  image: Yup.string().required("Upload Image"),
});

const AddCourses = ({ modal }) => {
  const [images, setImages] = useState({});
  const [prevData, setPrevData] = useState({});
  const [loading, setLoading] = useState(true);
  const { request } = useRequest();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request({
          url: `course/${modal}`,
        }).then((res) => res);
        setPrevData(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (modal) fetchData();
    else setLoading(false);
    // eslint-disable-next-line
  }, []);
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("filename", values.image);
    // formData.append("title", values.title);
    // formData.append("sub_title", values.sub_title);
    // formData.append("description", values.description);
    // formData.append("number_section", values.sections);
    // formData.append("level", values.level);
    // formData.append("price", values.price);

    try {
      const { downloadURL } = await request({
        url: "fileUpload",
        method: "post",
        data: formData,
      });
      await request({
        url: `${modal ? `course/updateCourse/${modal}` : "course"}`,
        method: "post",
        data: { img_url: downloadURL, ...values },
      }).then((res) => {
        message.success(res?.message);
      });
    } catch (error) {
      console.log("Something went wrong", error);
    }

    setSubmitting(false);
    setImages({});
    resetForm();
    setPrevData({});
  };
  return (
    <Wrap>
      {loading ? (
        <Spin />
      ) : (
        <Wrap.Card>
          <Wrap.Header>
            <div> Add Course Details</div>
          </Wrap.Header>
          <Wrap.CardBody>
            <Formik
              enctype="multipart/form-data"
              initialValues={{
                title: prevData?.title,
                sub_title: prevData?.sub_title || "",
                description: prevData?.description || "",
                number_section: prevData?.number_section || "",
                level: prevData?.level || "",
                price: prevData?.price || "",
                image: prevData?.image || "",
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
                    <label for="title">Course Title</label>
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
                      <div className="invalid-tooltip mt-25">
                        {errors.title}
                      </div>
                    ) : null}
                  </Wrap.FormGroup>
                  <Wrap.FormGroup className="my-3">
                    <label for="sub_title">Course Subtitle</label>
                    <Field
                      type="text"
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
                    <label for="description">Course Description</label>
                    {/* <Field name="description" id="description" /> */}
                    <textarea
                      name="description"
                      id="description"
                      cols="30"
                      rows="10"
                      required
                      value={values.description}
                      onChange={(e) =>
                        setFieldValue("description", e.target.value)
                      }
                      className={`form-control ${
                        errors.description &&
                        touched.description &&
                        "is-invalid"
                      }`}
                    ></textarea>
                    {errors.description && touched.description ? (
                      <div className="invalid-tooltip mt-25">
                        {errors.description}
                      </div>
                    ) : null}
                  </Wrap.FormGroup>

                  <Wrap.FormGroup className="my-3">
                    <label for="price">Course Price</label>
                    <Field
                      name="price"
                      id="price"
                      type="text"
                      required
                      className={`form-control ${
                        errors.price && touched.price && "is-invalid"
                      }`}
                    />
                    {errors.price && touched.price ? (
                      <div className="invalid-tooltip mt-25">
                        {errors.price}
                      </div>
                    ) : null}
                  </Wrap.FormGroup>

                  <Wrap.FormGroup className="my-3">
                    <label for="level">Course Level</label>
                    <Field
                      name="level"
                      id="level"
                      required
                      type="text"
                      className={`form-control ${
                        errors.level && touched.level && "is-invalid"
                      }`}
                    />
                    {errors.level && touched.level ? (
                      <div className="invalid-tooltip mt-25">
                        {errors.level}
                      </div>
                    ) : null}
                  </Wrap.FormGroup>

                  <Wrap.FormGroup className="my-3">
                    <label for="number_section">Number Of Sections</label>
                    <Field
                      name="number_section"
                      id="number_section"
                      type="number"
                      required
                      className={`form-control ${
                        errors.number_section &&
                        touched.number_section &&
                        "is-invalid"
                      }`}
                    />
                    {errors.number_section && touched.number_section ? (
                      <div className="invalid-tooltip mt-25">
                        {errors.number_section}
                      </div>
                    ) : null}
                  </Wrap.FormGroup>

                  <Wrap.FormGroup className="my-3">
                    {values.image?.length <= 0 || modal ? (
                      <label
                        className="btn btn-primary"
                        htmlFor="image"
                        color="primary"
                        style={{ position: "relative" }}
                      >
                        Upload Cover Image
                        {/* <Field
                        name="image"
                        type="file"
                        id="image"
                        style={{ position: "absolute", zIndex: "-10" }}
                        required
                        className={`form-control ${
                          errors.image && touched.image && "is-invalid"
                        }`}
                        accept=".png,.jpg,image/png,image/jpeg"
                        onChange={(event) => {
                          console.log(event.target.files);
                          setFieldValue("image", event.target.files[0]);
                          setImages({
                            ...images,
                            image: URL.createObjectURL(event.target.files[0]),
                          });
                        }}
                      /> */}
                        <input
                          type="file"
                          name="image"
                          id="image"
                          style={{ position: "absolute", zIndex: "-10" }}
                          required
                          className={`form-control ${
                            errors.image && touched.image && "is-invalid"
                          }`}
                          accept=".png,.jpg,image/png,image/jpeg"
                          onChange={(event) => {
                            setFieldValue("image", event.target.files[0]);
                            setImages({
                              ...images,
                              image: URL.createObjectURL(event.target.files[0]),
                            });
                          }}
                        />
                        {errors.image && touched.image ? (
                          <div className="invalid-tooltip mt-25">
                            {errors.image}
                          </div>
                        ) : null}
                      </label>
                    ) : null}
                    {images.image?.length ? (
                      <>
                        <img
                          className="img-fluid"
                          src={images.image}
                          alt="course"
                          style={{ maxHeight: "400px", height: "100%" }}
                        />
                        <div className="upload-wrap">
                          <label
                            className="btn btn-flat-primary"
                            htmlFor="update-image"
                            color="primary"
                          >
                            Upload Image
                            <input
                              type="file"
                              id="update-image"
                              hidden
                              name="image"
                              accept=".png,.jpg,image/png,image/jpeg"
                              onChange={(event) => {
                                setFieldValue("image", event.target.files[0]);
                                setImages({
                                  ...images,
                                  image: URL.createObjectURL(
                                    event.target.files[0]
                                  ),
                                });
                              }}
                            />
                          </label>
                          <button
                            className="flat-danger"
                            onClick={() => {
                              setFieldValue("image", "");
                              setImages({});
                            }}
                          >
                            Remove Image
                          </button>
                        </div>
                      </>
                    ) : null}
                  </Wrap.FormGroup>

                  {/* <Wrap.FormGroup className="my-3">
                  {values.logo?.length <= 0 ? (
                    <label
                      className="btn btn-primary"
                      htmlFor="upload-logo"
                      color="primary"
                      style={{ position: "relative" }}
                    >
                      Upload Logo
                      <Field
                        name="logo"
                        type="file"
                        id="upload-logo"
                        style={{ position: "absolute", zIndex: "-10" }}
                        required
                        accept="image/svg+xml"
                        className={`form-control ${
                          errors.logo && touched.logo && "is-invalid"
                        }`}
                        onChange={(event) => {
                          setFieldValue("logo", event.target.files[0]);
                          setImages({
                            ...images,
                            logo: URL.createObjectURL(event.target.files[0]),
                          });
                        }}
                      />
                    </label>
                  ) : null}
                  {images.logo?.length ? (
                    <>
                      <img
                        className="img-fluid"
                        src={images.logo}
                        alt="logo"
                        style={{ maxHeight: "400px", height: "100%" }}
                      />
                      <div className="upload-wrap">
                        <label
                          className="btn btn-flat-primary"
                          htmlFor="update-logo"
                          color="primary"
                        >
                          Upload Logo
                          <input
                            type="file"
                            id="update-logo"
                            hidden
                            accept="image/svg+xml"
                            onChange={(event) => {
                              setFieldValue(
                                "logo",
                                event.target.files[0]
                              );
                              setImages({
                                ...images,
                                logo: URL.createObjectURL(
                                  event.target.files[0]
                                ),
                              });
                            }}
                          />
                        </label>
                        <button
                          className="flat-danger"
                          onClick={() => {
                            setFieldValue("logo", "");
                            setImages({});
                          }}
                        >
                          Remove Logo
                        </button>
                      </div>
                    </>
                  ) : null}
                </Wrap.FormGroup> */}

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
      )}
    </Wrap>
  );
};

export default AddCourses;
