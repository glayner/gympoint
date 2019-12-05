import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  overflow: auto;
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  max-height: 548px;
  text-align: center;
  background: #fff;
  padding: 35px;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    strong {
      margin-top: 5px;
      padding: 5px;
      text-align: left;
      font-size: 14px;
      color: #444;
    }

    span {
      font-size: 12px;
      color: red;
      margin: 0 0 10px;
    }

    input {
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid #aaa;
      border-radius: 4px;
      height: 45px;
      width: 300px;
      padding: 0 15px;
      font-size: 16px;
      color: #444;
      margin: 0 0 10px;

      &::placeholder {
        color: #999;
      }
    }

    button {
      margin: 5px 0 0;
      height: 45px;
      width: 300px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#ee4d64')};
      }
    }
  }
`;
