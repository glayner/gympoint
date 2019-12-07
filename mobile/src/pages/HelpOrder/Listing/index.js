import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {withNavigationFocus} from 'react-navigation';

import Background from '~/components/Background';
import api from '~/services/api';
import ListOrders from './ListOrders';

import {Container, SubmitButton, List} from './styles';

function Listing({navigation, isFocused}) {
  const [orders, setOrders] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const {id} = useSelector(state => state.user.profile);

  async function loadOrders() {
    const response = await api.get(`students/${id}/help-orders`);
    setOrders(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadOrders();
    }
  }, [isFocused]); // eslint-disable-line

  function handleRefreshing() {
    setRefreshing(true);
    loadOrders();
    setRefreshing(false);
  }

  return (
    <Background>
      <Container>
        <SubmitButton onPress={() => navigation.navigate('New')}>
          Novo pedido de auxílio
        </SubmitButton>
        <List
          data={orders}
          keyExtractor={item => String(item.id)}
          onRefresh={handleRefreshing}
          onEndReacherdThreshold={0.2}
          refreshing={refreshing}
          renderItem={({item}) => (
            <ListOrders data={item} navigation={navigation} />
          )}
        />
      </Container>
    </Background>
  );
}

Listing.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Listing);
