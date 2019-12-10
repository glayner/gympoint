import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

import logohead from '~/assets/logohead.png';

export const Header = styled.SafeAreaView`
  align-items: center;
  justify-content: center;
  height: 55px;
  background: #fff;
  flex-direction: row;
`;

export const LogoutButton = styled(RectButton)`
  padding: 10px;
  position: absolute;
  right: 20px;
`;

export const Logo = styled.Image.attrs({
  source: logohead,
  resizeMode: 'cover',
})``;

export const Container = styled.View`
  background: #f2f2f2;
  flex: 1;
`;
