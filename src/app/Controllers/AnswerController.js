import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Mail from '../../lib/Mail';

class AnswerController {
  async index(req, res) {
    const helpOrder = await HelpOrder.findAll({
      where: {
        answer_at: null,
      },
    });
    return res.json(helpOrder);
  }

  async update(req, res) {
    const helpOrder = await HelpOrder.findByPk(req.params.id);
    helpOrder.answer = req.body.answer;
    helpOrder.answer_at = new Date();

    await helpOrder.save();

    const { name, email } = await Student.findByPk(helpOrder.student_id);

    await Mail.sendMail({
      to: `${name}<${email}>`,
      subject: 'Sua pergunta foi respondida',
      template: 'answer',
      context: {
        name,
        question: helpOrder.question,
        answer: req.body.answer,
      },
    });

    return res.json(helpOrder);
  }
}

export default new AnswerController();
