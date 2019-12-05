import styled from 'styled-components';
import { darken } from 'polished';
import { Form } from '@rocketseat/unform';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    overflow-x: auto;
    align-items: flex-start;
    &::-webkit-scrollbar {
      height: 8px;
    }
    &::-webkit-scrollbar * {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 15px;
      background: rgba(0, 0, 0, 0.09) !important;
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  button {
    background: none;
    border: 0;
    margin: 8px;

    &.pageDisable {
      cursor: not-allowed;
      visibility: hidden;
    }
  }
`;

export const Cover = styled.div`
  table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    thead {
      td:first-of-type {
        text-align: left;
        padding-left: 0px;
      }
      td {
        font-size: 16px;
        line-height: 20px;
        color: #444;
        font-weight: bold;
        padding: 10px 25px;
        text-align: center;
      }
      td:last-of-type {
        text-align: end;
        padding-right: 0;
      }
    }
    tbody {
      tr:not(:last-of-type) {
        border-bottom: 1px solid #eee;
      }
      td:first-of-type {
        text-align: left;
        padding: 10px 150px 10px 0;
      }
      td {
        max-width: 500px;
        overflow: hidden;
        font-size: 16px;
        text-align: center;
        color: #666;
        padding: 10px 25px;
      }
      td:last-of-type {
        min-width: 120px;
        font-size: 15px;
        padding: 10px 0;
        text-align: right;
      }
      > span {
        font-size: 16px;
        color: #666;
        line-height: 20px;
      }

      a {
        padding-right: 23px;
        font-size: 15px;
        color: #4d85ee;
      }
      button.orderResponse {
        padding-right: 23px;
        font-size: 15px;
        color: #4d85ee;
      }

      button {
        background: none;
        border: 0;
        font-size: 15px;
        color: #de3b3b;
      }
    }
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px auto 20px;
  width: 100%;
  div {
    display: flex;

    a.back {
      background: #ccc;
      padding: 10px 20px;
      border-radius: 4px;
      display: flex;
      align-items: center;

      height: 36px;
      transition: background 0.2s;
      justify-content: space-around;
      margin-right: 16px;

      &:hover {
        background: ${darken(0.1, '#ccc')};
      }

      > span {
        font-size: 14px;
        color: #fff;
        margin-left: 8px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 4px;

  div.divDone {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Formcontent = styled(Form)`
  label {
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    color: #444;
    font-size: 14px;
    font-weight: bold;
    input {
      border: 1px solid #ddd;
      background: #fff;
      font-size: 16px;
      height: 45px;
      border-radius: 4px;
      width: 100%;
      padding: 10px;
      color: #666;
      margin-top: 8px;
      font-weight: normal;
    }

    input.readOnly {
      background: #f5f5f5;
    }

    > span {
      color: red;
      font-weight: normal;
    }
  }
  div.formline {
    display: flex;

    strong {
      margin-bottom: auto;
    }
    span {
      margin: 0;
      font-weight: normal;
    }
  }
  button.register {
    border: 0;
    background: #ee4d64;
    padding: 0 20px;
    border-radius: 4px;
    display: flex;
    height: 36px;
    transition: background 0.2s;
    justify-content: space-around;
    align-items: center;

    &:hover {
      background: ${darken(0.1, '#ee4d64')};
    }

    > span {
      font-size: 14px;
      color: #fff;
      margin-left: 8px;
    }
    svg {
      margin: 0;
    }
  }
`;
