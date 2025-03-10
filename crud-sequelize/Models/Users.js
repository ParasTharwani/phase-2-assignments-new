import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.TEXT,
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'user',
    timestamps: false, // Disable createdAt and updatedAt fields
});

export default User;