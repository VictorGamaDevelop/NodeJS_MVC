const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Farmer = sequelize.define('Farmer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  corporateReason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fantasyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpfCnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  numberCell: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Farmer;
