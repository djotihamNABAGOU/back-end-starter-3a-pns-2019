const { Router } = require('express');
const { Ticket } = require('../../models');
const { Student } = require('../../models');

const students = Student.get();
const router = new Router();
router.get('/', (req, res) => res.status(200)
  .json(Ticket.get( students)));
router.get('/:ticketId', (req, res) => res.status(200)
  .json(Ticket.getById(req.params.ticketId, students)));
router.delete('/:ticketId', (req, res) => res.status(200)
  .json(Ticket.delete(req.params.ticketId)));
router.put('/:ticketId', (req, res) => res.status(200)
  .json(Ticket.update(req.params.ticketId, req.body, students)));
router.post('/', (req, res) => {
  try {
    const ticket = Ticket.create(req.body, students);
    res.status(201)
      .json(ticket);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400)
        .json(err.extra);
    } else {
      res.status(500)
        .json(err);
    }
  }
});

module.exports = router;
