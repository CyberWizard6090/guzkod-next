import { ReviewForm } from 'features/review-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Форма для отправки отзыва',
  description: 'На этой странице вы можете оставить свой отзыв о нашей медицинской организации',
  openGraph: {
    title: 'Форма для отправки отзыва',
    description: 'На этой странице вы можете оставить свой отзыв о нашей медицинской организации',
  },
  twitter: {
    title: 'Форма для отправки отзыва',
    description: 'На этой странице вы можете оставить свой отзыв о нашей медицинской организации',
    card: 'summary_large_image',
  },
};

export const ReviewsPage = () => {
  return <ReviewForm />;
};
export default ReviewsPage;
