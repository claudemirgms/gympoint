import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const planExists = await Plan.findOne({
      where: {
        title: req.body.title,
      },
    });

    if (planExists) {
      return res.status(400).json({ error: 'Plan already exists' });
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async index(req, res) {
    const plan = await Plan.findAll();
    return res.json(plan);
  }

  async update(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'plan not found' });
    }

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: 'plan not found' });
    }

    await plan.destroy();

    return res.json(plan);
  }
}

export default new PlanController();
