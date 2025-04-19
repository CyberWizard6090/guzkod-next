import { Page } from 'shared/ui/page';
import './feedbackPage.scss';
import { FormFeedback } from 'widgets/feedback_form';
import { useDocumentTitle } from 'shared/lib/hooks/useDocumentTitle';

export const FeedbackPage = () => {
  useDocumentTitle('Обратная связь');
  return (
    <Page>
      <FormFeedback />
    </Page>
  );
};
