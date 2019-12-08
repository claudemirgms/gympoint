import { addMonths, parseISO, format, isBefore } from 'date-fns';
import currencyFormatter from 'currency-formatter';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Mail from '../../lib/Mail';

class EnrollmentController {
  async store(req, res) {
    const { student_id, plan_id, start_date } = req.body;

    if (isBefore(start_date, new Date())) {
      return res.status(400).json({ error: 'Please, put a date after today.' });
    }

    const enrollmentExists = await Enrollment.findOne({
      where: {
        student_id,
      },
    });

    if (enrollmentExists) {
      return res.status(400).json({ error: 'Enrollment already exists' });
    }

    const { duration, price } = await Plan.findOne({
      where: {
        id: plan_id,
      },
    });

    const end_date = addMonths(parseISO(start_date), duration);
    const totalPrice = price * duration;

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price: totalPrice,
    });

    const { name, email } = await Student.findByPk(student_id);
    const { title } = await Plan.findByPk(plan_id);
    await Mail.sendMail({
      to: `${name}<${email}>`,
      subject: 'Matricula criada com sucesso',
      template: 'wellcome',
      context: {
        name,
        title,
        s_date: format(parseISO(start_date), 'dd/MM/yyyy'),
        e_date: format(end_date, 'dd/MM/yyyy'),
        price: currencyFormatter.format(totalPrice, { code: 'BRL' }),
      },
    });

    return res.json(enrollment);
  }

  async index(req, res) {
    const enrollment = await Enrollment.findAll();
    return res.json(enrollment);
  }

  async update(req, res) {
    const { student_id, plan_id, start_date } = req.body;

    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(400).json({ error: 'enrollment not found' });
    }

    const { duration, price } = await Plan.findOne({
      where: {
        id: plan_id,
      },
    });

    const end_date = addMonths(parseISO(start_date), duration);
    const totalPrice = price * duration;

    await enrollment.update({
      student_id,
      plan_id,
      start_date,
      end_date,
      price: totalPrice,
    });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(400).json({ error: 'enrollment not found' });
    }

    await enrollment.destroy();

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
