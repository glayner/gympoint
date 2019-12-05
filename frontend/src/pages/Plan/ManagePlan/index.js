import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { formatPrice } from '~/util/format';
import api from '~/services/api';
import history from '~/services/history';

import Mask from '~/components/InputMask';

import { Container, Formcontent, Title, Content } from '~/styles/default';

const schema = Yup.object().shape({
  title: Yup.string().required('O titulo é obrigatório'),
  duration: Yup.number()
    .integer('somente numeros inteiros')
    .positive('não é permitido valores negativos')
    .typeError('Valor inválido')
    .required(),
  price: Yup.number()
    .positive('não é permitido valores negativos')
    .typeError('Valor inválido')
    .required()
});

export default function ManagePlan({ match }) {
const dispatch = useDispatch();

  const { id } = match.params;
  const [price, setPrice] = useState(null);
  const [duration, setDuration] = useState(null);
  const [totalPrice, setTotalPrice] = useState('');
  const [plan, setPlan] = useState();

  useEffect(() => {
    setTotalPrice(formatPrice(price * duration));
  }, [price, duration]);

  useEffect(() => {
    async function loadManagePlan() {
      try {
        const response = await api.get('plans', {
          params: { page: 1, per_page: 100 }
        });
        const data = response.data.find(p => p.id === Number(id));
        setPlan(data);
        setPrice(data.price);
        setDuration(data.duration);
      } catch (e) {
         if (e.response.data.error === 'Token invalid') {
        dispatch(signOut());
      } else {
        toast.error(e.response.data.error);
      }
      }
    }
    loadManagePlan();
  }, [id]);// eslint-disable-line

  async function handleSubmit(data) {
    try {
      await api.put(`plans/${plan.id}`, {
        ...data
      });
      toast.success('successfully edited');
      history.push('/plan');
    } catch (e) {
       if (e.response.data.error === 'Token invalid') {
        dispatch(signOut());
      } else {
        toast.error(e.response.data.error);
      }
    }
  }

  return (
    <Container>
      <Formcontent schema={schema} initialData={plan} onSubmit={handleSubmit}>
        <Title>
          <h1>Edição de plano</h1>
          <div>
            <Link className="back" to="/plan">
              <MdKeyboardArrowLeft size={20} color="#FFF" />
              <span> VOLTAR</span>
            </Link>
            <button className="register" type="submit">
              <MdCheck size={20} color="#FFF" /> <span> SALVAR</span>
            </button>
          </div>
        </Title>
        <Content>
          <label>
            TÍTULO DO PLANO
            <Input type="text" name="title" placeholder="titulo" />
          </label>
          <div className="formline">
            <label>
              <strong> DURAÇÃO (em meses)</strong>
              <Input
                type="number"
                name="duration"
                onChange={e => setDuration(e.target.value)}
                placeholder="duração"
              />
            </label>
            <label>
              <strong> PREÇO MENSAL</strong>
              <Mask name="price" prefix="R$" setChange={setPrice} />
            </label>
            <label>
              <strong> PREÇO TOTAL</strong>
              <Input
                type="text"
                name="totalPrice"
                readOnly
                className="readOnly"
                value={totalPrice}
              />
            </label>
          </div>
        </Content>
      </Formcontent>
    </Container>
  );
}
ManagePlan.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    }).isRequired
  }).isRequired
};
