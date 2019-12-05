import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  overflow-y: hidden;
  overflow-x: auto;

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

  nav {
    display: flex;
    align-items: center;

    div {
      display: flex;
      align-items: center;

      > img {
        height: 24px;
        width: 45px;
        margin-right: 11px;
      }

      > span {
        margin-right: 20px;
        padding-right: 20px;
        border-right: 1px solid #ccc;
        font-size: 15px;
        font-weight: bold;
        color: #ee4d64;
      }
    }
    a {
      font-weight: bold;
      font-size: 15px;
      color: #999;
      margin-right: 20px;

      &.selected {
        color: #444;
      }

      &:hover {
        color: #444;
      }
    }
  }

  aside {
    display: flex;
    flex-direction: column;

    > span {
      font-size: 14px;
      color: #666;
      margin-bottom: 4px;
    }

    button {
      background: none;
      border: 0;
      font-size: 14px;
      color: #de3b3b;
    }
  }
`;
