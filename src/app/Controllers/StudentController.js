import Student from '../models/Student';

class StudentsController {
  async store(req, res) {
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(401).json({ error: 'User already exists' });
    }
    const student = await Student.create(req.body);
    return res.json(student);
  }

  async index(req, res) {
    const students = await Student.findAll();
    return res.json(students);
  }
}

export default new StudentsController();
