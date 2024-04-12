const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./index');


const User = sequelize.define('User', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(320),
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING(13),
    allowNull: false,
  },
  photoUrl: {
    type: DataTypes.STRING(255),
  },
  userType: {
    type: DataTypes.ENUM('ADMIN', 'USER'),
    allowNull: false,
  },
}, {
  tableName: 'users',
});

User.findByEmailAndId = async function (email, id) {
  try {
    const user = await User.findOne({
      where: { email, id },
    });
    return user;
  } catch (error) {
    throw new Error('Error finding user by email and id: ' + error.message);
  }
};

module.exports = {User};