import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// Import models
import UserModel from "./User.js";
import PropertyModel from "./Property.js";

export const registerRelations = () => {
    const db = {};
    db.User = UserModel(sequelize);
    db.Property = PropertyModel(sequelize);

    // Run associations (if defined)
    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
}