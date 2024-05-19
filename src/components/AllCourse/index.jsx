// ** MUI Imports
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
// import { Modal, ModalBody } from "reactstrap";
import AddCourses from "../AddCourses";
import { Col, Row } from "./style";
import { Button, Modal, Empty, message } from "antd";
import useRequest from "../../hooks/useRequest";
const { confirm } = Modal;
const AllCourse = () => {
  const [courses, setCourses] = useState([]);
  const [modal, setModal] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { request } = useRequest();
  useEffect(() => {
    request({
      url: "course/getAllCourses",
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setCourses(res);
    });
    // eslint-disable-next-line
  }, [modal]);
  const Title = styled.h2`
    font-weight: 500;
    font-size: 20px;
    color: rgba(51, 48, 60, 0.87);
  `;
  const Wrap = styled.div`
    background-color: #fff;
    border-radius: 5px;
    height: 100%;
    .title {
      display: flex;
      align-items: center;
      .controllers {
        margin-left: auto;

        .edit,
        .delete {
          width: 22px;
          height: 22px;
          margin-right: 5px;
        }
      }
    }
  `;
  const toggle = () => setModal(!modal);
  const handleEdit = (a, b) => {
    setModal(a);
    setCourseId(b);
  };

  const handleCancel = () => {
    setModal(false);
  };
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this course?",
      // icon: <Inform />,
      content: "Course cannot be recovered!",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        request({ url: `course/${id}`, method: "delete" }).then((res) => {
          message.success(res?.message);
          setCourseId(id);
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  var cardStyle = {
    transitionDuration: "0.3s",
    height: "480px",
    margin: "20px",
  };
  console.log(courses, "courses");
  return (
    <Wrap style={{ padding: "24px" }}>
      <Col.Modal
        onCancel={handleCancel}
        open={modal === "edit"}
        toggle={toggle}
        centered={true}
        width="60%"
        height="fit-content"
        footer={null}
      >
        <AddCourses modal={courseId} />
      </Col.Modal>

      {courses?.length > 0 ? (
        <>
          <Title>All Courses</Title>
          <Row>
            {courses?.map((i) => (
              <Col>
                <Card style={cardStyle}>
                  <NavLink to={`${i?._id}`}>
                    <CardMedia
                      sx={{ height: "14.5625rem" }}
                      image={i?.img_url}
                      alt="image"
                    />
                  </NavLink>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }} className="title">
                      {i?.title || "no title"}{" "}
                      <div className="controllers">
                        <Edit
                          className="edit"
                          onClick={() => handleEdit("edit", i?._id)}
                        />
                        <Delete
                          className="delete"
                          onClick={() => showDeleteConfirm(i?._id)}
                        />
                      </div>
                    </Typography>
                    <Typography variant="body2" className="desc">
                      {i?.description || "no description"}
                    </Typography>
                  </CardContent>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={<span>There aren't courses yet</span>}
        >
          <Button type="primary">
            <NavLink to="/add-courses">Create Now</NavLink>
          </Button>
        </Empty>
      )}
    </Wrap>
  );
};

export default AllCourse;
