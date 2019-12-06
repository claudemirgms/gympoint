import Enrollment from '../models/Enrollment';

class EnrollmentController {
  async store(req, res) {
    const enrollmentExists = await Enrollment.findOne({
      where: {
        student_id: req.body.student_id,
      },
    });

    if (enrollmentExists) {
      return res.status(400).json({ error: 'Enrollment already exists' });
    }

    const enrollment = await Enrollment.create(req.body);

    return res.json(enrollment);
  }

  async index(req, res) {
    const enrollment = await Enrollment.findAll();
    return res.json(enrollment);
  }

  async update(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(400).json({ error: 'enrollment not found' });
    }

    await enrollment.update(req.body);

    return res.json(enrollment);
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(400).json({ error: 'enrollment not found' });
    }

    await enrollment.delete();

    return res.status(200);
  }
}

export default new EnrollmentController();
