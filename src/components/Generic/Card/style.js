import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  /* align-items: center; */
  width: fit-content;
  border-radius: 8px;
  padding: 24px;
  background-color: #fff;
  flex: ${({ flex }) => (flex ? flex : 1)};
  height: ${({ height }) => (height ? height : "fit-content")};
`;
