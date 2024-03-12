const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./index');

/**
 * @swagger
 * components:
 *  schemas:
 *    EditableUser:
 *      type: object
 *      required:
 *        - fullName
 *        - email
 *        - password
 *        - phoneNumber
 *      properties:
 *        fullName:
 *          type: string
 *          minLength: 3
 *          maxLength: 50
 *          example: John Doe
 *        email:
 *          type: string
 *          minLength: 1
 *          maxLength: 320
 *          example: johndoe@mail.com
 *        password:
 *          type: string
 *          minLength: 8
 *          maxLength: 320
 *          example: P@ssw0rd
 *        phoneNumber:
 *          type: string
 *          minLength: 8
 *          maxLength: 13
 *          example: 639123456789
 *        
 *    User:
 *      allOf:
 *        - $ref: '#/components/schemas/EditableUser'
 *        - type: object
 *          properties:
 *            photoUrl:
 *              type: string
 *              minLength: 4
 *              maxLength: 2000
 *              example: https://placehold.co/50x50
 *            userType:
 *              type: string
 *              enum:
 *                - USER
 *                - ADMIN
 *              example: 'USER'
 */
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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

module.exports = User;