const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Car, Rent } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Rent.findAll({

  })
  .then(dbRentData => res.json(dbRentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/:id', withAuth, (req, res) => {
  Rent.create({
    renter_id: req.session.user_id,
    car_id: req.params.id,
    start_date: req.body.start_date,
    end_date: req.body.end_date
    
  })
    .then(dbRentData => res.json(dbRentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;