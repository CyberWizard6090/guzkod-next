import { FormFeedback } from 'features/feedback-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Форма обратной связи',
  description: 'Здесь вы можете отправить нам сообщение или задать вопрос',
  openGraph: {
    title: 'Форма обратной связи',
    description: 'Здесь вы можете отправить нам сообщение или задать вопрос',
  },
  twitter: {
    title: 'Форма обратной связи',
    description: 'Здесь вы можете отправить нам сообщение или задать вопрос',
  },
};

const FeedbackPage = () => {
  return <FormFeedback />;
};
export default FeedbackPage;
