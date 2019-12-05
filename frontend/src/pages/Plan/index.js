import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  MdAdd,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft
} from 'react-icons/md';

import { formatPrice } from '~/util/format';
import api from '~/services/api';
import { Container, Cover, Title, Content, Pagination } from '~/styles/default';

export default function Plan() {
  const dispatch = useDispatch();

  const [plans, setPlans] = useState([]);

  const [page, setPage] = useState(1);
  const [prevDisable, setPrevDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(false);

  async function loadPlans() {
    try {
      const response = await api.get('plans', {
        params: { page, per_page: 10 }
      });
      if (page === 1) {
        setPrevDisable(true);
      }
      if (response.data.length < 10) {
        setNextDisable(true);
      }
      const data = response.data.map(plan => ({
        ...plan,
        durationFormatted:
          plan.duration === 1 ? `${plan.duration} mês` : `${plan.duration} meses`,
        priceFormatted: formatPrice(plan.price)
      }));
      setPlans(data);
    } catch (e) {
      if (e.response.data.error === 'Token invalid') {
        dispatch(signOut());
      } else {
        toast.error(e.response.data.error)
      }
    }
  }

  useEffect(() => {
    loadPlans();
  }, [page]); // eslint-disable-line

  async function handleDelete(id) {
    try {
      // eslint-disable-next-line no-alert
      const result = window.confirm('Certeza que deseja deletar?');
      if (result) {
        await api.delete(`plans/${id}`);
        toast.success('successfully deleted');
        loadPlans();
      }
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }

  function handlePevPage() {
    if (page > 1) {
      setPage(page - 1);
      setNextDisable(false);
    }
  }
  function handleNextPage() {
    if (plans.length === 10) {
      setPage(page + 1);
      setPrevDisable(false);
    }
  }

  return (
    <Container>
      <Cover>
        <Title>
          <h1>Gerenciando Planos</h1>
          <Link className="register" to="/planregister">
            <MdAdd size={20} color="#FFF" /> <span> CADASTRAR</span>
          </Link>
        </Title>
        <Content>
          <table>
            <thead>
              <tr>
                <td>TÍTULO</td>
                <td>DURAÇÃO</td>
                <td>VALOR p/ MÊS</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td>{plan.durationFormatted}</td>
                  <td>{plan.priceFormatted}</td>
                  <td>
                    <a href={`/planmanage/${plan.id}`}>editar</a>

                    <button type="button" onClick={() => handleDelete(plan.id)}>
                      apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Content>
        <Pagination>
          <button
            type="button"
            className={prevDisable ? 'pageDisable' : ''}
            onClick={() => handlePevPage()}
          >
            <MdKeyboardArrowLeft
              size={30}
              color={prevDisable ? '#BBB' : '#EE4D64'}
            />
          </button>
          <button
            type="button"
            className={nextDisable ? 'pageDisable' : ''}
            onClick={() => handleNextPage()}
          >
            <MdKeyboardArrowRight
              size={30}
              color={nextDisable ? '#BBB' : '#EE4D64'}
            />
          </button>
        </Pagination>
      </Cover>
    </Container>
  );
}
