const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Car, Rent } = require('../../models');
const withAuth = require('../../utils/auth');
const AWS = require('aws-sdk');
const fs = require('fs');
const uuid = require('uuid-random');

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
    .then(dbCarData => res.json(dbCarData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

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
      res.json(dbCarData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {

  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  console.log('entro')
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

  // owner_id: req.session.user_id,

  const s3 = new AWS.S3({
    accessKeyId: process.env.ACCES_KEY,
    secretAccessKey: process.env.SECRET_KEY
  });
  
  const base64Data = new Buffer.from(req.body.photo.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  const type = req.body.photo.split(';')[0].split('/')[1];
  const fileName = uuid();
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${fileName}.${type}`, // File name you want to save as in S3
    Body: base64Data,
    ContentType: `image/${type}`,
    ContentEncoding: 'base64',
    ACL: 'public-read',
};

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      Car.create({
        make: req.body.make,
        model: req.body.model,
        owner_id: req.session.user_id,
        photo: data.Location,
        year: req.body.year,
        color: req.body.color,
        rate: req.body.rate
      })
        .then(dbCarData => res.json(dbCarData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
  });


  // Car.create({
  //   make: req.body.make,
  //   model: req.body.model,
  //   owner_id: req.session.user_id,
  //   photo: req.body.photo,
  //   year: req.body.year,
  //   color: req.body.color,
  //   rate: req.body.rate
  // })
  //   .then(dbCarData => res.json(dbCarData))
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });

});

router.put('/:id', withAuth, (req, res) => {
  Car.update(req.body, {
    individualHooks: true,
    where: {
        id: req.params.id
      }
    }
  )
    .then(dbCarData => {
      if (!dbCarData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbCarData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Car.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCarData => {
      if (!dbCarData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbCarData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;