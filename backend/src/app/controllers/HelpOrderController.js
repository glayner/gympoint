import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async store(req, res) {
    const schemas = Yup.object().shape({
      question: Yup.string().required(),
    });
    if (!(await schemas.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.findByPk(req.params.id);
    // check this student there is
    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }
    const { question } = req.body;

    if (question.length > 255) {
      return res
        .status(400)
        .json({ error: 'maximum number of characters exceeded' });
    }

    const helpOrder = await HelpOrder.create({
      student_id: student.id,
      question,
    });

    return res.json(helpOrder);
  }

  async index(req, res) {
    const student = await Student.findByPk(req.params.id);
    // check this student there is
    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }
    const helpOrder = await HelpOrder.findAll({
      where: { student_id: student.id },
    });
    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
