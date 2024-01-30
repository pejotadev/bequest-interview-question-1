import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";

import db from "../../../../database/database"

class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare private_key: string;
  declare public_key: string;
  declare created_at: Date | number;
  declare updated_at: Date | number;
  declare deleted_at: Date | number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    private_key: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "private_key",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "name",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "email",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "password",
    },
    public_key: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "public_key",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal("dbo.GetLocalDateTime()"),
      field: "created_at",
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal("dbo.GetLocalDateTime()"),
      field: "updated_at",
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "deleted_at",
    },
  },
  {
    tableName: "user",
    sequelize: db.getSequelize(),
    timestamps: false,
  }
);



export default User;
