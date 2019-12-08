import { Op } from 'sequelize';
import { subDays } from 'date-fns';
import Checkin from '../models/Checkin';

class CheckinController {
  async store(req, res) {
    const checkin = await Checkin.findAll({
      where: {
        student_id: req.params.id,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });
    if (checkin && checkin.length >= 5) {
      return res
        .status(400)
        .json({ error: 'You exceeded the amount of checkins for the period.' });
    }
    const checkinCreate = await Checkin.create({ student_id: req.params.id });
    return res.json(checkinCreate);
  }

  async index(req, res) {
    const checkin = await Checkin.findAll({
      where: { student_id: req.params.id },
    });
    return res.json(checkin);
  }
}

export default new CheckinController();
