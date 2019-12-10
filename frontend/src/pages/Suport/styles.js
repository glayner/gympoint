import styled from 'styled-components';
import { darken } from 'polished';
import { Input, Form } from '@rocketseat/unform';

export const ModalContainer = styled.div`
  max-width: 450px;
  min-width: 350px;
  max-height: 425px;
  min-height: 325px;
  form {
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  strong {
    color: #444;
    font-size: 14px;
    margin-bottom: 8px;
    span {
      font-size: 14px;
      color: #555;
      font-weight: normal;
    }
  }
  div {
    height: 110px;
    overflow: auto;
    span {
      font-size: 16px;
      color: #666;
    }
  }
`;

export const ModalForm = styled(Form)`
  margin-top: 25px;
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    strong {
      color: #444;
      font-size: 14px;
      span {
        font-size: 14px;
        color: #555;
        overflow: hidden;
        font-weight: normal;
      }
    }

    > span {
      color: red;
      font-size: 14px;
      padding: 5px;
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
`;

export const ModalInput = styled(Input)`
  background: #fff;
  height: 127px;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: ${props => (props.readOnly ? 0 : '1px solid #ddd')};
  border-radius: 4px;
  font-size: 16px;
  color: #666;
  font-weight: normal;

  &::-webkit-resizer {
    visibility: hidden;
  }

  &::-webkit-scrollbar {
    width: 4px;
    background: #fff;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #ee4e62;
  }
`;

export const AnswerSize = styled.span`
  text-align: right;
  margin: 0 10px;
  font-size: 12px;
  color: ${props => (props.limit ? '#ee4e62' : '#666666')};
`;
