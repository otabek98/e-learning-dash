import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f7f6f9;
  .header {
    gap: 20px;
    display: flex;
    /* background-color: red; */
    width: 100%;
    .card {
      border-radius: 8px;
      padding: 24px;
      background-color: #fff;
    }
    .students-joined {
      display: flex;
      flex: 2;
    }

    .content {
      height: 100%;
      .title {
        color: rgba(47, 43, 61, 0.78);
        font-size: 1.125rem;
        line-height: 1.5rem;
        font-weight: 500px !important;
        white-space: nowrap !important;
      }
      .subtitle {
        color: rgba(47, 43, 61, 0.68);
        font-size: 15px;
        margin-bottom: 8px!;
      }
      .count {
        color: #7367f0;
        font-size: 44px;
      }
    }
    .statistics {
      flex: 5;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        color: rgba(47, 43, 61, 0.78);
        padding-bottom: 24px;
        font-size: 20px;
      }
      .wrap-stats {
        display: flex;
        align-items: center;
        height: 80px;
        margin-top: auto;
        .item {
          display: flex;
          align-items: center;
          flex: 1;

          .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #e8e6fc;
            margin-right: 10px;
            img {
              width: 28px;
              height: 28px;
            }
          }
          .details {
            display: flex;
            flex-direction: column;
            justify-content: center;

            span {
              font-size: 20px;
              font-weight: 500;
              color: rgba(47, 43, 61, 0.78);
            }
            p {
              font-size: 16px;
              font-weight: 400;
              color: rgba(47, 43, 61, 0.68);
            }
          }
          .userI {
            /* background-color: #00cfe8; */
          }
        }
      }
    }
  }
  .main {
    margin-top: 40px;
  }
`;
