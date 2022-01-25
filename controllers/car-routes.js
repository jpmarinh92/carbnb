const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Car, Rent } = require('../models');
const withAuth = require('../utils/auth');
const AWS = require('aws-sdk');


router.get('/:id', (req, res) => {
  Car.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'email', 'username',]
      },
      {
        model: Rent,
      }
    ]
  })
    .then(dbCarData => {
      if (!dbCarData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      
      const car = dbCarData.get({ plain: true });

      let today = new Date();
      let start_date;
      let end_date;
      let new_date;
      let disabledDates = [];
      for (let i=0; i < car.rents.length; i++){
        start_date = new Date(car.rents[i].start_date.split("-").reverse().join("/"));
        end_date = new Date(car.rents[i].end_date.split("-").reverse().join("/"));
        new_date = start_date;
        while (new_date <= end_date) {
          disabledDates.push(new_date.toISOString().split('T')[0])
          new_date = new Date(new_date.setDate(new_date.getDate() + 1));
          
        }
      }
      console.log(disabledDates);
      res.render('renting', { car, disabledDates, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;