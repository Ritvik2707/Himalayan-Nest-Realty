import { DataTypes } from "sequelize";

const PropertyModel = (sequelize) => {
    const Property = sequelize.define("Properties", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            values: ['flat', 'house', 'plot', 'pg', 'farmhouse', 'villa', 'office', 'shop', 'other'],
        },
        purpose: {
            type: DataTypes.STRING,
            allowNull: false,
            values: ['rent', 'sale'],
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        images: {
            type: DataTypes.JSON, // Store array of image URLs/paths
            allowNull: true,
            defaultValue: [],
        },
        dealer_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: 'Users', key: 'id' },
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true, // Property is active by default
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, // Automatically set the creation date
        },
    });

    return Property;
}

export default PropertyModel