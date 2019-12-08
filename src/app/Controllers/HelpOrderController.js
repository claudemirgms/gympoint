import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async store(req, res) {
    const helpOrder = await HelpOrder.create({
      student_id: req.params.id,
      question: req.body.question,
    });
    return res.json(helpOrder);
  }

  async index(req, res) {
    const helpOrder = await HelpOrder.findAll({
      where: {
        student_id: req.params.id,
      },
    });
    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
