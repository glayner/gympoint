import {Platform} from 'react-native';
import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  background: #fff;
  padding: 0 30px;

  justify-content: center;
  align-items: center;
`;
export const Form = styled.View`
  align-self: stretch;
`;

export const FormInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  padding: 0 15px;
  height: 45px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  border: #ddd;
  margin-top: 25px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;
