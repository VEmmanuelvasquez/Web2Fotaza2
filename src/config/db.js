require('dotenv').config();
const { Sequelize } = require('sequelize');

const config = {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT
};

if (process.env.DB_HOST.includes('neon.tech')) {
    config.dialectOptions = {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    };
}

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    config
);

module.exports = sequelize;