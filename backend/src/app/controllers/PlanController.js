import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .required(),
      price: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    // check if plan already exists
    const planExists = await Plan.findOne({ where: { title: req.body.title } });
    if (planExists) {
      return res.status(400).json({ error: 'Plan  already registered' });
    }
    const { title, duration, price } = await Plan.create(req.body);

    return res.json({ title, duration, price });
  }

  async index(req, res) {
    const { page, per_page } = req.query;
    const plans = await Plan.findAll({
      order: ['duration'],
      limit: per_page,
      offset: (page - 1) * per_page,
      attributes: ['id', 'title', 'duration', 'price'],
    });
    return res.json(plans);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().integer(),
      price: Yup.number(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { title } = req.body;
    const plan = await Plan.findByPk(req.params.id);
    // check this plan there is
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }
    // check unique title in an existing plan
    if (title !== plan.title) {
      const planExists = await Plan.findOne({
        where: { title: req.body.title },
      });
      if (planExists) {
        return res.status(400).json({ error: 'Plan  already registered' });
      }
    }
    const { duration, price } = await plan.update(req.body);
    return res.json({ title, duration, price });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);
    // check this plan there is
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }
    const { id, title, duration, price } = plan;
    await plan.destroy();
    return res.json({ id, title, duration, price });
  }
}
export default new PlanController();
