// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Package = sequelize.define("Package", {
    // The email cannot be null, and must be a proper email before creation
    package_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dimesnsions: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Package;
};
