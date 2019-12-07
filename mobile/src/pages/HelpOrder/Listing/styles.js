import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const SubmitButton = styled(Button)`
  margin-bottom: 10px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
