import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logoImage from '~/assets/logoImage.png';

import { Container, Content } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.auth.profile);

  function handleSignOut() {
    dispatch(signOut());
  }
  const urlsize = document.URL.split('/').length - 1;
  const newUrl = document.URL.split('/')[urlsize];

  return (
    <Container>
      <Content>
        <nav>
          <div>
            <img src={logoImage} alt="GymPoint" />
            <span>GYMPOINT</span>
          </div>
          <Link
            className={newUrl === 'student' ? 'selected' : ''}
            to="/student"
          >
            ALUNOS
          </Link>
          <Link className={newUrl === 'plan' ? 'selected' : ''} to="/plan">
            PLANOS
          </Link>
          <Link
            className={newUrl === 'enrollment' ? 'selected' : ''}
            to="/enrollment"
          >
            MATRÍCULAS
          </Link>
          <Link className={newUrl === 'suport' ? 'selected' : ''} to="/suport">
            PEDIDOS DE AUXÍLIO
          </Link>
        </nav>
        <aside>
          <span>{profile ? profile.name: ''}</span>
          <button type="button" onClick={handleSignOut}>
            sair do sistema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
