import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import {Container, Title, TitleText, TitleTime, Content, Text} from './styles';

export default function Detail({navigation}) {
  const data = navigation.getParam('data');

  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  const dateAnswerParsed = useMemo(() => {
    if (!data.answer_at) {
      return '';
    }
    return formatRelative(parseISO(data.answer_at), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.answer_at]);

  return (
    <Background>
      <Container>
        <Title>
          <TitleText>Pergunta: </TitleText>
          <TitleTime>{dateParsed}</TitleTime>
        </Title>
        <Content>
          <Text>{data.question}</Text>
        </Content>
        <Title>
          <TitleText>Resposta:</TitleText>
          <TitleTime>{dateAnswerParsed}</TitleTime>
        </Title>
        <Content>
          <Text>{data.answer}</Text>
        </Content>
      </Container>
    </Background>
  );
}

Detail.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Listing');
      }}>
      <Icon name="chevron-left" size={24} color="#000" />
    </TouchableOpacity>
  ),
});

Detail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
