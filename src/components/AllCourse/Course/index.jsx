import React, { useEffect, useState } from "react";
import {
  Container,
  Lesson,
  LessonList,
  MainContent,
  SectionTitle,
  Sidebar,
  VideoFrame,
  VideoPlayer,
} from "./style";

import AddSections from "../../AddSections";
import AddLessons from "../../AddLessons";
import { ReactComponent as Edit } from "../../../assets/icons/edit.svg";
// import { Modal, ModalBody } from "reactstrap";
import { useParams } from "react-router-dom";
import { Modal } from "antd";
import useRequest from "../../../hooks/useRequest";
export default function Course() {
  const { courseId } = useParams();
  const [data, setData] = useState();

  const [modal, setModal] = useState();
  const { request } = useRequest();
  const [activeLesson, setActiveLesson] = React.useState(
    JSON.parse(sessionStorage.getItem("activeLesson"))
  );

  useEffect(() => {
    const getCourse = async () => {
      const info = await request({ url: `course/${courseId}` });
      setData(info);
      const storedData = JSON.parse(sessionStorage.getItem("activeLesson"));
      if (!storedData) {
        setActiveLesson(info?.sections[0]?.lessons[0]);
      }
    };
    getCourse();
    // eslint-disable-next-line
  }, []);
  const handleModal = (modal) => {
    setModal(modal);
  };
  const handleCancel = () => {
    setModal(false);
  };

  return (
    <Container>
      <Modal
        onCancel={handleCancel}
        open={modal === "section"}
        centered={true}
        width="60%"
      >
        <AddSections />
      </Modal>
      <Modal
        onCancel={handleCancel}
        open={modal === "lesson"}
        centered={true}
        width="60%"
      >
        <AddLessons />
      </Modal>
      <MainContent>
        <VideoPlayer>
          <VideoFrame src={activeLesson?.video_url} controls muted autoPlay />
        </VideoPlayer>
        <h1>{activeLesson?.title}</h1>
        <span>{activeLesson?.sub_title}</span>
      </MainContent>
      <Sidebar>
        {data?.sections?.map((section) => (
          <div key={section._id}>
            <SectionTitle>
              {section.title}
              <Edit className="edit" onClick={() => handleModal("section")} />
            </SectionTitle>

            <LessonList>
              {section.lessons.map((lesson, index) => (
                <Lesson
                  key={lesson._id}
                  isActive={activeLesson?._id === lesson?._id}
                  onClick={() => {
                    sessionStorage.setItem(
                      "activeLesson",
                      JSON.stringify(lesson)
                    );
                    setActiveLesson(lesson);
                  }}
                >
                  {index + 1} - Lesson
                  <Edit
                    style={{ width: "20%", marginLeft: "auto" }}
                    className="edit"
                    onClick={() => handleModal("lesson")}
                  />
                </Lesson>
              ))}
            </LessonList>
          </div>
        ))}
      </Sidebar>
    </Container>
  );
}
