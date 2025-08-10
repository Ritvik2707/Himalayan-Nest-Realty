import { Sequelize } from 'sequelize';
import UserModel from '../models/User.js';
import PropertyModel from '../models/Property.js';
import SubscriptionModel from '../models/Subscription.js';
import EnquiryModel from '../models/Enquiry.js';
import { config } from 'dotenv';

config({ quiet: true });

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false, // Disable logging
})

export const connectToDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        await sequelize.sync();
    }
    catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
}

export const User = UserModel(sequelize);
export const Property = PropertyModel(sequelize);
export const Subscription = SubscriptionModel(sequelize);
export const Enquiry = EnquiryModel(sequelize);