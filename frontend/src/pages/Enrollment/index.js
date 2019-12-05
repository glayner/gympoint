import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import { toast } from 'react-toastify';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Link } from 'react-router-dom';
import {
  MdAdd,
  MdCheckCircle,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft
} from 'react-icons/md';

import api from '~/services/api';

import { Container, Cover, Title, Content, Pagination } from '~/styles/default';

export default function Enrollment() {
const dispatch = useDispatch();

  const [enrollments, setEnrollments] = useState([]);
  const [page, setPage] = useState(1);
  const [prevDisable, setPrevDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(false);

  async function loadEnrollment() {
    try {
    const response = await api.get('enrollments', {
      params: { page, per_page: 10 }
    });
    if (page === 1) {
      setPrevDisable(true);
    }
    if (response.data.length < 10) {
      setNextDisable(true);
    }
    const data = response.data.map(enrollment => ({
      ...enrollment,
      startDateFormatted: format(
        parseISO(enrollment.start_date),
        "dd 'de' MMMM 'de' yyyy",
        {
          locale: pt
        }
      ),
      endDateFormatted: format(
        parseISO(enrollment.end_date),
        "dd 'de' MMMM 'de' yyyy",
        {
          locale: pt
        }
      )
    }));
    setEnrollments(data);

  } catch (e) {
    if(e.response.data.error === 'Token invalid'){
        dispatch(signOut());
    }else{
      toast.error(e.response.data.error)
    }
  }
  }

  useEffect(() => {
    loadEnrollment();
  }, [page]); // eslint-disable-line

  async function handleDelete(id) {
    try {
      // eslint-disable-next-line no-alert
      const result = window.confirm('Certeza que deseja deletar?');
      if (result) {
        await api.delete(`enrollments/${id}`);
        toast.success('successfully deleted');
        loadEnrollment();
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
    if (enrollments.length === 10) {
      setPage(page + 1);
      setPrevDisable(false);
    }
  }

  return (
    <Container>
      <Cover>
        <Title>
          <h1>Gerenciando matrícula</h1>
          <Link className="register" to="/enrollmentregister">
            <MdAdd size={20} color="#FFF" /> <span> CADASTRAR</span>
          </Link>
        </Title>
        <Content>
          <table>
            <thead>
              <tr>
                <td>ALUNO</td>
                <td>PLANO</td>
                <td>INICIO</td>
                <td>TÉRMINO</td>
                <td>ATIVA</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {enrollments.map(enrollment => (
                <tr key={enrollment.id}>
                  <td>
                    {enrollment.student ? enrollment.student.name : 'deleted'}
                  </td>
                  <td>{enrollment.plan ? enrollment.plan.title : 'deleted'}</td>
                  <td>{enrollment.startDateFormatted}</td>
                  <td>{enrollment.endDateFormatted}</td>
                  <td>
                    <MdCheckCircle
                      size={20}
                      color={enrollment.active ? '#42cb59' : '#ddd'}
                    />
                  </td>
                  <td>
                    <a href={`/enrollmentmanage/${enrollment.id}`}>editar</a>
                    <button
                      type="button"
                      onClick={() => handleDelete(enrollment.id)}
                    >
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
