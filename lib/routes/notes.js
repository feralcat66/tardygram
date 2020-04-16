const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Note = require('../models/Note');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Note
      .create({ ...req.body, commentBy: req.user._id })
      .then(post => res.send(post))
      .catch(next);
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    Note
      .findOneAndUpdate({
        _id: req.params.id,
        commentBy: req.user._id
      }, req.body, { new: true })
      .then(post => res.send(post))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Note
      .findOneAndDelete({
        _id: req.params.id,
        commentBy: req.user._id
      })
      .then(post => res.send(post))
      .catch(next);
  });
