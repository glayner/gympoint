import styled from 'styled-components';
import { darken } from 'polished';

export const ModalContainer = styled.div`
  max-width: 425px;

  > div {
    display: flex;
    flex-direction: column;
    strong {
      color: #444;
      font-size: 14px;
      span {
        font-size: 14px;
        color: #555;
        font-weight: normal;
      }
    }
    span {
      font-size: 16px;
      margin-top: 8px;
      color: #666;
    }
  }
  form {
    span {
      color: red;
      font-size: 14px;
      padding: 5px;
    }
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    label {
      display: flex;
      flex-direction: column;
      strong {
        color: #444;
        font-size: 14px;
      }
      textarea {
        border: 1px solid #ddd;
        background: #fff;
        font-size: 16px;
        height: 127px;
        border-radius: 4px;
        width: 100%;
        padding: 10px;
        color: #666;
        margin-top: 8px;
        font-weight: normal;
      }
    }
    button {
      margin: 15px 0 0;
      height: 45px;
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
