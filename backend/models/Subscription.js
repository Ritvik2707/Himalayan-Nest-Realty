import { DataTypes } from "sequelize";

const SubscriptionModel = (sequelize) => {
    return sequelize.define("Subscriptions", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID
            primaryKey: true,
            allowNull: false,
        },
        dealerId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: 'Users', key: 'id' },
        },
        planType: {
            type: DataTypes.STRING,
            allowNull: false,
            values: ['basic', 'premium'],
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true, // Subscription is active by default
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, // Automatically set the creation date
        },
    });
}

export default SubscriptionModel;