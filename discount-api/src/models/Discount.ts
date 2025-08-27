import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class Discount extends Model {
  public id!: number;
  public productId!: string;
  public discountPercentage!: number;
  public description!: string;
}

Discount.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    discountPercentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "discounts",
    timestamps: false,
  }
);
