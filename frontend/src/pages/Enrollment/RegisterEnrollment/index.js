import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  format,
  addMonths,
  setHours,
  setMinutes,
  setSeconds,
  endOfSecond
} from 'date-fns';

import pt from 'date-fns/locale/pt-BR';

import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { formatPrice } from '~/util/format';
import api from '~/services/api';
import history from '~/services/history';

import InputAsyncSelect from '~/components/InputAsyncSelect';
import DatePicker from '~/components/InputDatePicker';
import ReactSelect from '~/components/InputSelect';

import { Container, Title, Content, Formcontent } from '~/styles/default';

const schema = Yup.object().shape({
  student: Yup.object()
    .shape({
      value: Yup.number().integer()
    })
    .typeError('Valor inválido')
    .required('Aluno obrigatório'),
  plan: Yup.object()
    .shape({
      value: Yup.number().integer()
    })
    .typeError('Valor inválido')
    .required('Aluno obrigatório'),
  start_date: Yup.date()
    .typeError('Valor inválido')
    .required('Data obrigatória')
});

export default function RegisterEnrollment() {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date());
  const [plans, setPlans] = useState({});
  const [plan, setPlan] = useState({});
  const [initialData, setInitialData] = useState({});

  async function loadPlans() {
    try {
      const response = await api
        .get('plans', {
          params: { page: 1, per_page: 100 }
        })
        .then(r => r.data)
        .then(d =>
          d.map(p => ({
            label: p.title,
            value: p.id,
            duration: p.duration,
            price: p.price
          }))
        );

      setPlans(response);

    } catch (e) {
      if (e.response.data.error === 'Token invalid') {
        dispatch(signOut());
      } else {
        toast.error(e.response.data.error);
      }
    }
  }

  const end_date = useMemo(() => {
    if (!plan.duration) {
      return '';
    }
    const { duration } = plan;
    const formattedDate = format(
      addMonths(startDate, duration),
      "dd'/'MM'/'yyyy",
      {
        locale: pt
      }
    );
    return formattedDate;
  }, [plan, startDate]);

  const totalPrice = useMemo(() => {
    if (!plan.price) return '';

    return formatPrice(Number(plan.duration) * Number(plan.price));
  }, [plan.duration, plan.price]);

  useEffect(() => {
    loadPlans();

    setInitialData({
      end_date,
      totalPrice
    });
  }, [end_date, startDate, totalPrice]);// eslint-disable-line

  async function handleSubmit(data) {
    try {
      const dateNow = new Date();
      const startDateNow = endOfSecond(
        setSeconds(
          setMinutes(
            setHours(data.start_date, dateNow.getHours()),
            dateNow.getMinutes()
          ),
          dateNow.getSeconds()
        )
      );
      await api.post('enrollments', {
        student_id: data.student.value,
        plan_id: data.plan.value,
        start_date: startDateNow
      });
      toast.success('successfully registered');
      history.push('/enrollment');
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }

  async function loadOptions(inputValue) {
    const response = await api
      .get('students', {
        params: { name: `${inputValue}`, page: 1, per_page: 100 }
      })
      .then(r => r.data)
      .then(r =>
        r.map(student => ({
          label: student.name,
          value: student.id
        }))
      );
    return response;
  }

  return (
    <Container>
      <Formcontent
        schema={schema}
        onSubmit={handleSubmit}
        initialData={initialData}
      >
        <Title>
          <h1>Cadastro de matrículas</h1>
          <div>
            <Link className="back" to="/enrollment">
              <MdKeyboardArrowLeft size={20} color="#FFF" />
              <span> VOLTAR</span>
            </Link>
            <button className="register" type="submit">
              <MdCheck size={20} color="#FFF" /> <span> SALVAR</span>
            </button>
          </div>
        </Title>
        <Content>
          <InputAsyncSelect
            name="student"
            loadOptions={loadOptions}
            label="ALUNO"
          />

          <div className="formline">
            <label>
              <strong> PLANO</strong>
              <ReactSelect name="plan" options={plans} setChange={setPlan} />
            </label>
            <label>
              <strong>DATA DE INÍCIO</strong>
              <DatePicker name="start_date" setChange={setStartDate} />
            </label>
            <label>
              <strong> DATA DE TÉRMINO</strong>
              <Input
                type="data"
                name="end_date"
                readOnly
                className="readOnly"
              />
            </label>
            <label>
              <strong> VALOR FINAL</strong>
              <Input
                type="text"
                name="totalPrice"
                readOnly
                className="readOnly"
              />
            </label>
          </div>
        </Content>
      </Formcontent>
    </Container>
  );
}
