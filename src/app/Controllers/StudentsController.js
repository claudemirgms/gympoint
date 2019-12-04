import Students from '../models/Students';

class StudentsController {
  async store(req, res) {
    const studentExists = await Students.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(401).json({ error: 'User already exists' });
    }
    const student = await Students.create(req.body);
    return res.json(student);
  }
}

export default new StudentsController();
