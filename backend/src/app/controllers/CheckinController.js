import { Op } from 'sequelize';
import { subDays, startOfDay, endOfDay } from 'date-fns';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async store(req, res) {
    // check this student exists
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }
    const checkins = await Checkin.findAll({
      where: {
        student_id: student.id,
        createdAt: {
          [Op.between]: [
            subDays(startOfDay(new Date()), 7),
            endOfDay(new Date()),
          ],
        },
      },
    });
    if (checkins.length >= 5) {
      return res
        .status(400)
        .json({ error: 'you can only do 5 checkins within 7 calendar days' });
    }
    const checkin = await Checkin.create({
      student_id: student.id,
    });
    return res.json(checkin);
  }

  async index(req, res) {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }
    const checkins = await Checkin.findAll({
      where: { student_id: student.id },
    });
    return res.json(checkins);
  }
}

export default new CheckinController();
