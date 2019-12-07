import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Background from '~/components/Background';

import Checks from './Checks';

import {Container, SubmitButton, List} from './styles';

export default function CheckIn() {
  const [checks, setChecks] = useState();
  const {id} = useSelector(state => state.user.profile);

  async function loadCheckIn() {
    const response = await api.get(`students/${id}/checkins`);
    setChecks(response.data);
  }

  useEffect(() => {
    loadCheckIn();
  }, []); // eslint-disable-line

  async function handleCheckIn() {
    try {
      await api.post(`students/${id}/checkins`);
      loadCheckIn();
    } catch (err) {
      Toast.show(err.response.data.error, Toast.LONG);
    }
  }

  return (
    <Background>
      <Container>
        <SubmitButton onPress={handleCheckIn}>Novo check-in</SubmitButton>
        <List
          data={checks}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => <Checks data={item} />}
        />
      </Container>
    </Background>
  );
}

CheckIn.navigationOptions = {
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({tintColor}) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};
