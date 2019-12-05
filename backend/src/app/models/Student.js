import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        student_weight: Sequelize.DOUBLE,
        student_height: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Student;
