import React from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
          <Logo />
        <LogoutButton onPress={handleLogout}>
          <Icon name="exit-to-app" size={20} color="#ee4e62" />
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
