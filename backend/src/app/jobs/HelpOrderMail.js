import Mail from '../../lib/Mail';

class HelpOrderMail {
  get Key() {
    return 'HelpOrderMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;
    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: 'Matricula realizada',
      template: 'helpOrder',
      context: {
        student: helpOrder.student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
      },
    });
  }
}
export default new HelpOrderMail();
