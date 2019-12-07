import {Platform} from 'react-native';
import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  padding: 10px 20px 20px 20px;
`;

export const InputMult = styled.TextInput.attrs({
  multiline: true,
  placeholderTextColor: '#999999',
  numberOfLines: 10,
})`
  border-radius: 4px;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 16px;
  padding: 20px;
  max-height: 230px;
`;

export const LengthInput = styled.Text`
  text-align: right;
  margin: 0 10px;
  font-size: 10px;
  color: ${props => (props.limit ? '#ee4e62' : '#666666')};
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;
