// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Package = sequelize.define("Package", {
    // The email cannot be null, and must be a proper email before creation
    
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dimensions: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
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
