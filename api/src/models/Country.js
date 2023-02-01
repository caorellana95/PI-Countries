const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    capital:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    subregion:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    area:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    population:{
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },{
    timestamps: false
  });
};
