//copied from week 14 activity 14 models/post.js

module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
      items: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    //   ,                add back in with a weight if need
    //   weight: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     len: [1]
    //   }
    });
  
    Order.associate = function(models) {
      // We're saying that a Order should belong to an Customer
      // A Order can't be created without an Author due to the foreign key constraint
      Order.belongsTo(models.Customer, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Order;
  };
  