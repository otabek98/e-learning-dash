import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f3f4f6;
`;

Container.Title = styled.h2`
  font-weight: 700;
  color: #111827;
  font-size: 24px;
`;

Container.Text = styled.p`
  color: #9ca3af;
  font-size: 14px;
  font-weight: 500;
`;

Container.Form = styled.form`
  display: block;
  width: 600px;
  height: fit-content;
  padding: 40px;
  background: #fff;
  margin: 50px auto;
  border-radius: 16px;
  max-width: 100%;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 6%), 0px 4px 6px rgb(0 0 0 / 10%);
`;
