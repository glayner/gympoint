import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .selectInput {
    height: 45px;
    input {
      height: 23px;
    }
  }

  span {
    margin-left: 10px;
    color: red;
    font-size: 14px;
  }
`;
