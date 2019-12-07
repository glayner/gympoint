import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Title,
  Answered,
  AnsweredText,
  Time,
  Content,
  Text,
} from './styles';

export default function ListOrders({data, navigation}) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  const answered = !!data.answer;

  function handleSelectOrder() {
    navigation.navigate('Detail', {data});
  }

  return (
    <Container onPress={handleSelectOrder}>
      <Title>
        <Answered>
          <Icon
            name="check-circle"
            size={16}
            color={answered ? '#42CB59' : '#999999'}
          />
          <AnsweredText answered={answered}>
            {answered ? 'Respondido' : 'Sem resposta'}
          </AnsweredText>
        </Answered>
        <Time>{dateParsed}</Time>
      </Title>
      <Content>
        <Text>{data.question}</Text>
      </Content>
    </Container>
  );
}

ListOrders.propTypes = {
  data: PropTypes.shape().isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
