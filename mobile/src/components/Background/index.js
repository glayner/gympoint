import React from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import {signOut} from '~/store/modules/user/actions';

import {Container, Header, LogoutButton, Logo} from './styles';

export default function Background({children}) {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <>
      <Header>
        <LogoutButton onPress={handleLogout}>
          <Logo />
        </LogoutButton>
      </Header>
      <Container>{children}</Container>
    </>
  );
}

Background.propTypes = {
  children: PropTypes.element,
};

Background.defaultProps = {
  children: null,
};
