import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CreationMail {
  get Key() {
    return 'CreationMail';
  }

  async handle({ data }) {
    const { enrollment, student, plan } = data;
    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matricula realizada',
      template: 'creation',
      context: {
        // logo,
        student: student.name,
        plan: plan.title,
        plan_price: plan.price,
        plan_duration: plan.duration,
        price: enrollment.price,
        start_date: format(
          parseISO(enrollment.start_date),
          "'dia' dd 'de' MMM 'de' yyyy', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        end_date: format(
          parseISO(enrollment.end_date),
          "'dia' dd 'de' MMM 'de' yyyy', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CreationMail();
