import React, {useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';

import api from '~/services/api';
import Background from '~/components/Background';

import {Container, InputMult, LengthInput, SubmitButton} from './styles';

export default function New({navigation}) {
  const [question, setQuestion] = useState('');
  const {id} = useSelector(state => state.user.profile);

  const questionLength = useMemo(() => {
    return 255 - question.length;
  }, [question.length]);

  async function handleSubmit() {
    try {
      await api.post(`students/${id}/help-orders`, {
        question,
      });
      navigation.navigate('Listing');
    } catch (err) {
      Toast.show(err.response.data.error, Toast.LONG);
    }
  }

  return (
    <Background>
      <Container>
        <LengthInput limit={questionLength < 0}>
          {questionLength}/255
        </LengthInput>
        <InputMult
          placeholder="Inclua seu pedido de auxílio"
          style={{textAlignVertical: 'top'}}
          onChangeText={setQuestion}
        />

        <SubmitButton onPress={handleSubmit}>Enviar pedido</SubmitButton>
      </Container>
    </Background>
  );
}

New.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Listing');
      }}>
      <Icon name="chevron-left" size={24} color="#000" />
    </TouchableOpacity>
  ),
});

New.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
