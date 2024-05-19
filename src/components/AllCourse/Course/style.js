import styled from "styled-components";
export const Container = styled.div`
  display: flex;
`;

export const Sidebar = styled.div`
  flex: 0 0 200px;
  padding: 20px;
  background-color: #f5f5f5;

  .edit {
    max-width: 25%;
    width: 100%;
    cursor: pointer;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  h1 {
    font-weight: 700;
    font-size: 16px;
    color: #1c1d1f;
  }
  span {
    font-weight: 400;
    font-size: 14px;
    color: #1c1d1f;
  }
`;

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 0;
  font-weight: 700;
  font-size: 16px;
  color: #1c1d1f;

  .edit {
    margin-left: 10px;
    min-width: 24px;
  }
`;

export const LessonList = styled.ul`
  list-style-type: decimal-leading-zero;
  padding: 0;
`;

export const Lesson = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  color: ${(props) => (props.isActive ? "#1c1d1f" : "#333")};
  background-color: ${(props) => (props.isActive ? "#d1d7dc" : "transparent")};

  &:hover {
    background-color: ${(props) => (props.isActive ? "#d1d7dc" : "#eee")};
  }
  font-weight: 400;
  font-size: 14px;
  padding: 5px 10px;

  .edit {
    margin-left: 10px;
    cursor: pointer;
  }
`;

export const VideoPlayer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  margin-bottom: 15px;
`;

export const VideoFrame = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
