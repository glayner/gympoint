import styled from 'styled-components';

export const Container = styled.div``;

export const Search = styled.div`
  form {
    margin-left: 15px;
    border: 1px solid #aaa;
    border-radius: 4px;
    height: 36px;
    width: 237px;
    background: rgba(255, 255, 255, 0.7);
    display: flex;

    input {
      flex: 1;
      background: none;
      border: 0;
      height: 36px;
      color: #444;

      &::placeholder {
        color: #999;
      }
    }
    > button {
      height: 36px;
      background: none;
      border: 0;
      padding: 8px;
    }
  }
`;
