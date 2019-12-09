module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Robert Morales',
          email: 'robertcmorales@dayrep.com',
          age: 40,
          student_weight: 85,
          student_height: 1.75,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Eduarda Ferreira',
          email: 'eduardasantosferreira@superrito.com',
          age: 36,
          student_weight: 70.9,
          student_height: 1.68,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Ricky Jackson',
          email: 'rickyjjackson@jourrapide.com',
          age: 55,
          student_weight: 75.4,
          student_height: 1.62,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Evelyn Rocha',
          email: 'evelynmelorocha@gustr.com',
          age: 18,
          student_weight: 47.7,
          student_height: 1.58,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Amanda Silva',
          email: 'amandacavalcantisilva@fleckens.com',
          age: 21,
          student_weight: 65.8,
          student_height: 1.71,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => queryInterface.bulkDelete('students', null, {}),
};
