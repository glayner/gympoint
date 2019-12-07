import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import { toast } from 'react-toastify';
import ReactModal from 'react-modal';

import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdDoneAll
} from 'react-icons/md';

import * as Yup from 'yup';
import api from '~/services/api';

import { Container, Cover, Title, Content, Pagination } from '~/styles/default';
import { ModalContainer, ModalContent, ModalForm,AnswerSize, ModalInput } from './styles';

const schema = Yup.object().shape({
  answer: Yup.string()
    .max(255, 'maximum number of characters exceeded')
    .required('answer required')
});

export default function Suport() {
  const dispatch = useDispatch();

  const [helpOrder, setHelpOrder] = useState([]);
  const [modalHelpOrder, setModalHelpOrder] = useState();
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);
  const [prevDisable, setPrevDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(false);

  const [answer, setAnswer] = useState('');

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  const answerSize = useMemo(() => {
    return 255 - answer.length;
  }, [answer])

  async function loadSuport() {
    try {
      const response = await api.get('/students/help-orders', {
        params: { page, per_page: 10 }
      });
      if (page === 1) {
        setPrevDisable(true);
      }
      if (response.data.length < 10) {
        setNextDisable(true);
      }
      setHelpOrder(response.data);
    } catch (e) {
      if (e.response.data.error === 'Token invalid') {
        dispatch(signOut());
      } else {
        toast.error(e.response.data.error)
      }
    }
  }

  useEffect(() => {
    loadSuport();
  }, [page]); // eslint-disable-line

  function handleHelpOrder(suport) {
    setModalHelpOrder(suport);
    setShowModal(true);
  }
  async function handleSubmit(data) {
    try {
      const { id } = modalHelpOrder;
      console.tron.log(`id: ${id}`);
      await api.post(`/students/help-orders/${id}/answer`, {
        ...data
      });
      toast.success(`successfully answered`);
      setShowModal(false);
      loadSuport();
    } catch (error) {
      console.tron.log(error);
      toast.error(`error: ${error}`);
    }
  }

  function handlePevPage() {
    if (page > 1) {
      setPage(page - 1);
      setNextDisable(false);
    }
  }
  function handleNextPage() {
    if (helpOrder.length === 10) {
      setPage(page + 1);
      setPrevDisable(false);
    }
  }
  if (helpOrder.length === 0) {
    return (
      <Container>
        <Cover>
          <Title>
            <h1>Pedidos de auxílio</h1>
          </Title>
          <Content>
            <div className="divDone">
              <MdDoneAll size={150} color="#ee4d64" />
              <span>Todos pedidos de auxílio foram respondidos</span>
            </div>
          </Content>
        </Cover>
      </Container>
    );
  }

  return (
    <Container>
      <Cover>
        <Title>
          <h1>Pedidos de auxílio</h1>
        </Title>
        <Content>
          <table>
            <thead>
              <tr>
                <td>Aluno</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {helpOrder.map(suport => (
                <tr key={suport.id}>
                  <td>{suport.student.name}</td>
                  <td>
                    <button
                      className="orderResponse"
                      type="button"
                      onClick={() => handleHelpOrder(suport)}
                    >
                      responder
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

      <ReactModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <ModalContainer>
          <ModalContent>
            <strong>
              PERGUNTA DO ALUNO:{' '}
              <span>{modalHelpOrder ? modalHelpOrder.student.name : null}</span>
            </strong>
            <span> {modalHelpOrder ? modalHelpOrder.question : null}</span>
          </ModalContent>
          <ModalForm
            initialData={modalHelpOrder}
            schema={schema}
            onSubmit={handleSubmit}
          >
            <label>
              <strong>SUA RESPOSTA</strong>

              <ModalInput
                multiline name="answer"
                onChange={e => setAnswer(e.target.value)}
                placeholder="Resposta..."
              />
            </label>
            <AnswerSize limit={answerSize < 0}>{answerSize}/255</AnswerSize>
            <button type="submit">Responder aluno</button>
          </ModalForm>
        </ModalContainer>
      </ReactModal>
    </Container>
  );
}
