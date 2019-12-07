import React, {useMemo} from 'react';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import {Container, Text, Time} from './styles';

export default function Checks({data}) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container>
      <Text>Check-in #{data.id}</Text>
      <Time>{dateParsed}</Time>
    </Container>
  );
}

Checks.propTypes = {
  data: PropTypes.shape().isRequired,
};
