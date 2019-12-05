module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('enrollments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: { model: 'students', key: 'id' }, // chave estrangeira
        onUpdate: 'CASCADE', // o que acontece caso o arquivo seja modificado
        onDelete: 'CASCADE', // ou deletado
        allowNull: true,
      },
      plan_id: {
        // provedor de serviço
        type: Sequelize.INTEGER,
        references: { model: 'plans', key: 'id' }, // chave estrangeira
        onUpdate: 'CASCADE', // o que acontece caso o arquivo seja modificado
        onDelete: 'SET NULL', // ou deletado
        allowNull: true,
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('enrollments');
  },
};
