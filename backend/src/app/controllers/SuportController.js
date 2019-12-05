import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import HelpOrderMail from '../jobs/HelpOrderMail';

class SuportController {
  async store(req, res) {
    const schemas = Yup.object().shape({
      answer: Yup.string().required(),
    });
    if (!(await schemas.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const helpOrder = await HelpOrder.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });
    // check this help order there is
    if (!helpOrder) {
      return res.status(400).json({ error: 'Help order does not exists' });
    }

    const { answer } = req.body;
    if (answer.length > 255) {
      return res
        .status(400)
        .json({ error: 'maximum number of characters exceeded' });
    }
    helpOrder.answer = answer;
    helpOrder.answer_at = new Date();
    await helpOrder.save();

    await Queue.add(HelpOrderMail.Key, { helpOrder });

    return res.json(helpOrder);
  }

  async index(req, res) {
    const { page, per_page } = req.query;
    const helpOrder = await HelpOrder.findAll({
      order: ['created_at'],
      limit: per_page,
      offset: (page - 1) * per_page,
      where: { answer: null },
      attributes: ['id', 'question', 'created_at', 'student_id'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });
    return res.json(helpOrder);
  }
}

export default new SuportController();
