import { Op } from 'sequelize';
import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .required(),
      student_weight: Yup.number(),
      student_height: Yup.number(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });
    // check if student already exists
    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    const {
      id,
      name,
      email,
      age,
      student_weight,
      student_height,
    } = await Student.create(req.body);
    return res.json({
      id,
      name,
      email,
      age,
      student_weight,
      student_height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number().integer(),
      student_weight: Yup.number(),
      student_height: Yup.number(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email } = req.body;
    const student = await Student.findByPk(req.params.id);
    // check this student there is
    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }
    // check unique email in an existing student
    if (email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } });
      if (studentExists) {
        return res.status(400).json({ error: 'Email already registered.' });
      }
    }
    const {
      id,
      name,
      age,
      student_weight,
      student_height,
    } = await student.update(req.body);
    return res.json({
      id,
      name,
      email,
      age,
      student_weight,
      student_height,
    });
  }

  async index(req, res) {
    const { name, page, per_page } = req.query;
    const student = await Student.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      order: ['name'],
      limit: per_page,
      offset: (page - 1) * per_page,
    });
    return res.json(student);
  }

  async delete(req, res) {
    const student = await Student.findByPk(req.params.id);
    // check this plan there is
    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }
    const { id, name, age, student_weight, student_height } = student;
    await student.destroy();
    return res.json({ id, name, age, student_weight, student_height });
  }
}

export default new StudentController();
