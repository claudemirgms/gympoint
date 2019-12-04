import express from 'express';

const app = express();

app.use(express.json());

app.post('/teste', (req, res) => {
  res.json(req.body);
});

app.listen(3333);
