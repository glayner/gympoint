import styled from 'styled-components/native';

export const Container = styled.View`
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  margin: 20px;
  padding: 20px;
`;

export const Title = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const TitleText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: #444444;
`;

export const TitleTime = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: #666666;
`;

export const Content = styled.View`
  margin: 15px 0;
`;

export const Text = styled.Text`
  font-size: 14px;
  line-height: 26px;
  color: #666666;
`;
