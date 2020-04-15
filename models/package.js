// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Package = sequelize.define("Package", {
    // The email cannot be null, and must be a proper email before creation

    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    package_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    package_weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    package_dimensions: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pickup_location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    delivery_location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    usermessage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });
  Package.associate = models => {
    Package.belongsTo(models.User, {
      foreignKey: "userId",
      sourceKey: "userId",
      onDelete: "no action",
      onUpdate: "cascade"
    });
    Package.belongsTo(models.Driver, {
      foreignKey: "driverId",
      sourceKey: "driverId",
      onDelete: "no action",
      onUpdate: "cascade"
    });
  };
  return Package;
};