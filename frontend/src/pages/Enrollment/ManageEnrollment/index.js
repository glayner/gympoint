import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  format,
  addMonths,
  setHours,
  setMinutes,
  setSeconds,
  endOfSecond,
  parseISO
} from 'date-fns';

import pt from 'date-fns/locale/pt-BR';

import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Input } from '@rocketseat/unform';

import { formatPrice } from '~/util/format';
import api from '~/services/api';
import history from '~/services/history';

import InputAsyncSelect from '~/components/InputAsyncSelect';
import DatePicker from '~/components/InputDatePicker';
import ReactSelect from '~/components/InputSelect';

import { Container, Title, Content, Formcontent } from '~/styles/default';

export default function ManageEnrollment({ match }) {
  const dispatch = useDispatch();

  const { id } = match.params;

  const [startDate, setStartDate] = useState();
  const [newDate, setNewDate] = useState();

  const [plans, setPlans] = useState({});
  const [plan, setPlan] = useState({});

  const [newStudent, setNewStudent] = useState({});

  useEffect(() => {
    async function loadManageEnrollment() {
      try {

        const enrollment = await api
          .get('enrollments', {
            params: { page: 1, per_page: 100 }
          })
          .then(r => r.data)
          .then(d => d.filter(e => e.id === Number(id)));

        setStartDate(parseISO(enrollment[0].start_date));
        setNewStudent({
          label: enrollment[0].student.name,
          value: enrollment[0].student.id
        });

        const loadPlans = await api
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

        if (enrollment[0].plan) {
          const defaultPlan = loadPlans.filter(
            p => p.value === enrollment[0].plan.id
          );
          setPlan(defaultPlan[0]);
        }

        setPlans(loadPlans);

      } catch (e) {
        if (e.response.data.error === 'Token invalid') {
          dispatch(signOut());
        } else {
          toast.error(e.response.data.error);
        }
      }
    }

    loadManageEnrollment();
  }, [id]);// eslint-disable-line

  const end_date = useMemo(() => {
    if (!plan.duration) {
      return '';
    }

    const start_date = newDate || startDate;

    const { duration } = plan;
    const formattedDate = format(
      addMonths(start_date, duration),
      "dd'/'MM'/'yyyy",
      {
        locale: pt
      }
    );
    return formattedDate;
  }, [newDate, plan, startDate]);

  const totalPrice = useMemo(() => {
    if (!plan.price) return '';
    return formatPrice(Number(plan.duration) * Number(plan.price));
  }, [plan]);

  const initialData = useMemo(() => {
    if (!!end_date && !!newStudent && !!plan && !!startDate && !!totalPrice) {
      return {
        end_date,
        totalPrice,
        plan,
        start_date: startDate,
        student: newStudent
      };
    }
    return {};
  }, [end_date, newStudent, plan, startDate, totalPrice]);

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

      let newData = {};
      if (!newDate) {
        newData = {
          student_id: data.student.value
            ? data.student.value
            : newStudent.value,
          plan_id: data.plan.value ? data.plan.value : plan.value,
          start_date: data.start_date
        };
      } else {
        newData = {
          student_id: data.student.value
            ? data.student.value
            : newStudent.value,
          plan_id: data.plan.value ? data.plan.value : plan.value,
          start_date: startDateNow
        };
      }

      await api.put(`enrollments/${id}`, {
        ...newData
      });
      history.push('/enrollment');
      toast.success('successfully edited');
    } catch (e) {
      if (e.response.data.error === 'Token invalid') {
        dispatch(signOut());
      } else {
        toast.error(e.response.data.error);
      }
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
      <Formcontent onSubmit={handleSubmit} initialData={initialData}>
        <Title>
          <h1>Edição de matrículas</h1>
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
              <DatePicker name="start_date" setChange={setNewDate} />
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

ManageEnrollment.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    }).isRequired
  }).isRequired
};
