import { Page } from 'shared/ui/page';
import './feedbackPage.scss';
import { FormFeedback } from 'widgets/feedback_form';

export const FeedbackPage = () => {
  return (
    <Page>
      <FormFeedback />
    </Page>
  );
};
