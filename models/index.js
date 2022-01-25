const User = require('./User');
const Car = require('./Car');
const Rent = require('./Rent');

User.hasMany(Car, {
  foreignKey: 'owner_id'
});

Car.belongsTo(User, {
  foreignKey: 'owner_id',
  onDelete: 'SET NULL'
});

User.hasMany(Rent, {
  foreignKey: 'renter_id',
})

Rent.belongsTo(User, {
  foreignKey: 'renter_id',
  onDelete: 'SET NULL'
})

Car.hasMany(Rent, {
  foreignKey: 'car_id',
})

Rent.belongsTo(Car, {
  foreignKey: 'car_id',
  onDelete: 'SET NULL'
})


module.exports = { User, Car, Rent };