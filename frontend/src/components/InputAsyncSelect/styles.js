import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  .asyncSelectInput {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    height: 45px;
    justify-content: center;
    input {
      height: 35px;
    }
  }

  span {
    margin-left: 10px;
    color: red;
    font-size: 14px;
  }
`;
