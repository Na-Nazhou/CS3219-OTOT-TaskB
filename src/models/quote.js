module.exports = (sequelize, DataTypes) => {
  const Quote = sequelize.define('Quote', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Quote;
};
