import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  MdAdd,
  MdSearch,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight
} from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';
import { Container, Cover, Title, Content, Pagination } from '~/styles/default';

import { Search } from './styles';

export default function Student() {
  const dispatch = useDispatch();

  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [prevDisable, setPrevDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(false);

  async function loadStudents() {
    try {
      const response = await api.get('students', {
        params: { name, page, per_page: 10 }
      });
      setStudents(response.data);
      if (page === 1) {
        setPrevDisable(true);
      }
      if (response.data.length < 10) {
        setNextDisable(true);
      }
    } catch (e) {
      if (e.response.data.error === 'Token invalid') {
        dispatch(signOut());
      } else {
        toast.error(e.response.data.error)
      }
    }
  }

  useEffect(() => {
    loadStudents();
  }, [page]); // eslint-disable-line

  function handleSearch({ nameSearch }) {
    setName(nameSearch);
    loadStudents();
  }

  async function handleDelete(id) {
    try {
      // eslint-disable-next-line no-alert
      const result = window.confirm('Certeza que deseja deletar?');
      if (result) {
        await api.delete(`students/${id}`);
        toast.success('successfully deleted');
        loadStudents();
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
    if (students.length === 10) {
      setPage(page + 1);
      setPrevDisable(false);
    }
  }
  return (
    <Container>
      <Cover>
        <Title>
          <h1>Gerenciando alunos</h1>
          <Search>
            <Link className="register" to="/studentregister">
              <MdAdd size={20} color="#FFF" /> <span> CADASTRAR</span>
            </Link>
            <Form onSubmit={handleSearch}>
              <button type="submit">
                <MdSearch size={16} color="#999" />
              </button>
              <Input name="nameSearch" placeholder="Buscar Aluno" />
            </Form>
          </Search>
        </Title>
        <Content>
          <table>
            <thead>
              <tr>
                <td>NOME</td>
                <td>E-Mail</td>
                <td>IDADE</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>
                    <Link to={`/studentmanage/${student.name}`}>editar</Link>
                    <button
                      type="submit"
                      onClick={() => handleDelete(student.id)}
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
