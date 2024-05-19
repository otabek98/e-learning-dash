import styled from "styled-components";
import { Modal } from "antd";

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-top: 20px;

  .edit {
    cursor: pointer;
  }
  .ant-modal-close {
    top: 0 !important;
  }
`;
export const Col = styled.div``;

Col.Modal = styled(Modal)`
  .desc {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
  }
  overflow: hidden;
`;
