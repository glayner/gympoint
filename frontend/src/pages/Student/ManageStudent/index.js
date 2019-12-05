import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import Mask from '~/components/InputMask';

import { Container, Title, Content, Formcontent } from '~/styles/default';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .typeError('Valor inválido')
    .required(),
  student_weight: Yup.number('Somente valores numéricos').typeError(
    'Valor inválido'
  ),
  student_height: Yup.number('Somente valores numéricos').typeError(
    'Valor inválido'
  )
});

export default function ManageStudent({ match }) {
  const dispatch = useDispatch();

  const { name } = match.params;
  const [student, setStudent] = useState({});

  useEffect(() => {
    async function loadManageStudent() {
      try {

        const response = await api.get('students', {
          params: { name, page: 1, per_page: 100 }
        });
        const data = response.data[0];
        setStudent({
          ...data
        });

      } catch (e) {
        if (e.response.data.error === 'Token invalid') {
          dispatch(signOut());
        } else {
          toast.error(e.response.data.error);
        }
      }
    }
    loadManageStudent();
  }, [name]);// eslint-disable-line

  async function handleSubmit(data) {
    try {
      await api.put(`students/${student.id}`, {
        ...data
      });
      toast.success('successfully edited');
      history.push('/student');
    } catch (e) {
      if (e.response.data.error === 'Token invalid') {
        dispatch(signOut());
      } else {
        toast.error(e.response.data.error);
      }
    }
  }
  return (
    <Container>
      <Formcontent
        schema={schema}
        initialData={student}
        onSubmit={handleSubmit}
      >
        <Title>
          <h1>Edição de aluno</h1>
          <div>
            <Link className="back" to="/student">
              <MdKeyboardArrowLeft size={20} color="#FFF" />
              <span> VOLTAR</span>
            </Link>
            <button className="register" type="submit">
              <MdCheck size={20} color="#FFF" /> <span> SALVAR</span>
            </button>
          </div>
        </Title>
        <Content>
          <label>
            NOME COMPLETO
            <Input type="text" name="name" placeholder="Nome" />
          </label>
          <label>
            ENDEREÇO DE E-MAIL
            <Input type="text" name="email" placeholder="exemplo@email.com" />
          </label>
          <div className="formline">
            <label>
              <strong> IDADE</strong>
              <Input type="number" name="age" />
            </label>
            <label>
              <strong> PESO (em kg)</strong>
              <Mask name="student_weight" suffix="kg" />
            </label>
            <label>
              <strong> ALTURA</strong>
              <Mask name="student_height" suffix="m" />
            </label>
          </div>
        </Content>
      </Formcontent>
    </Container>
  );
}

ManageStudent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string
    }).isRequired
  }).isRequired
};
