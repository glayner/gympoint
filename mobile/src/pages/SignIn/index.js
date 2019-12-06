import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image} from 'react-native';

import logo from '~/assets/logo.png';

import {signInRequest} from '~/store/modules/user/actions';

import {Container, Form, FormInput, SubmitButton} from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);
  const [id, setId] = useState();

  function handleSubmit() {
    dispatch(signInRequest(id));
  }
  return (
    <Container>
      <Image source={logo} />
      <Form>
        <FormInput
          keyboardType="numeric"
          placeholder="Digite seu ID de acesso"
          value={id}
          onChangeText={setId}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}
