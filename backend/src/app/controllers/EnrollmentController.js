import * as Yup from 'yup';
import {
  parseISO,
  addMonths,
  isBefore,
  isAfter,
  startOfMinute,
  endOfMinute,
} from 'date-fns';
import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import CreationMail from '../jobs/CreationMail';

class EnrollmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
      plan_id: Yup.number()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;
    const date = parseISO(start_date);
    const plan = await Plan.findByPk(plan_id);
    // check this plan there is
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }
    // check this student exists
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }
    // check past dates
    if (isBefore(date, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const price = plan.price * plan.duration;
    const end_date = addMonths(date, plan.duration);

    const enrollment = await Enrollment.create({
      start_date: date,
      end_date,
      price,
      student_id,
      plan_id,
    });
    await Queue.add(CreationMail.Key, { enrollment, student, plan });

    return res.json(enrollment);
  }

  async index(req, res) {
    const { page, per_page } = req.query;
    const enrollment = await Enrollment.findAll({
      order: [['created_at', 'DESC']],
      limit: per_page,
      offset: (page - 1) * per_page,
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration'],
        },
      ],
    });
    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().integer(),
      plan_id: Yup.number().integer(),
      start_date: Yup.date(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { student_id, plan_id, start_date } = req.body;
    const enrollment = await Enrollment.findByPk(req.params.id);
    // check this enrollment there is
    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exists' });
    }
    const date = parseISO(start_date);
    const plan = await Plan.findByPk(plan_id);
    // check this plan there is
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }
    // check this student exists
    if (!(await Student.findByPk(student_id))) {
      return res.status(400).json({ error: 'Student does not exists' });
    }
    // check past dates
    if (
      isBefore(date, startOfMinute(enrollment.start_date)) ||
      isAfter(date, endOfMinute(enrollment.start_date))
    ) {
      if (isBefore(date, new Date())) {
        return res.status(400).json({ error: 'Past dates are not permitted' });
      }
    }
    const price = plan.price * plan.duration;
    const end_date = addMonths(date, plan.duration);
    const enrollmentUpdated = await enrollment.update({
      start_date: date,
      end_date,
      price,
      student_id,
      plan_id,
    });
    return res.json(enrollmentUpdated);
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration'],
        },
      ],
    });
    // check if enrollment exists
    if (!enrollment) {
      return res.status(400).json({ error: 'Invalid Enrollment' });
    }
    const enrollmentDeleted = enrollment;
    await enrollment.destroy();
    return res.json(enrollmentDeleted);
  }
}

export default new EnrollmentController();
