const { Model, DataTypes } = require('sequelize');
const sequelize = require ('../config/connection');

class Rent extends Model{}

Rent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    renter_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    car_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'car',
        key: 'id'
      }
    },
    start_date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    end_date: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    modelName: 'rent'
  }
);

module.exports = Rent;