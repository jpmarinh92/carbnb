const router = require('express').Router();
const sequelize = require('../config/connection');
const { Car, User, Rent } = require('../models');

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.get('/', (req, res) => {

  Car.findAll({
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
      const cars = dbCarData.map(car => car.get({ plain: true }));
      res.render('rent', { cars, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

router.get('/host', (req, res) => {
  res.render('host');
})

router.get('/dashboard', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.session.user_id,
    },
    include: [
      {
        model: Car,
        
      },
      {
        model: Rent,
        include: [
          {
            model: Car
          }
        ]
      
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      const user = dbUserData.get({ plain: true });
      const cars = user.cars;
      const rents = user.rents;
      
      // const rents =  user.rents.map(rent => {
      //   return rent.car;
      // });
      res.render('dashboard', {rents, cars});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  
})

module.exports = router;