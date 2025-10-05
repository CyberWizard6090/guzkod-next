import { Block } from 'shared/ui/block';
import { formatDate } from 'shared/lib/format';
import { Review } from '../model/types';
import IconStarFill from 'shared/assets/svg/bootstrap-icons-1.11.2/star-fill.svg';
import { MultilineText } from 'shared/ui/multiline-text';
import { ExpandableBlock } from 'entities/expandable';

import './ReviewCard.scss';
type StarRatingProps = { rating: number };

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div className="review-card__star-rating">
      {[...Array(5)].map((_, i) => (
        <IconStarFill
          key={i}
          className={
            i < rating ? 'review-card__rating-icon--checked' : 'review-card__rating-icon--unchecked'
          }
        />
      ))}
    </div>
  );
};

export const ReviewCard = ({
  user_name,
  doctor_name,
  department,
  rating,
  date_of_visit,
  positive_feedback,
  negative_feedback,
  is_verified,
  createdAt,
}: Review) => {
  const safeUserName = user_name?.trim() || 'Аноним';
  const safeDoctorName = doctor_name?.trim() || 'Не указан';
  const safeDepartment = department?.trim() || 'Отделение не указано';
  const safeDateOfVisit = date_of_visit ? formatDate(date_of_visit) : 'Дата визита не указана';
  const safeCreatedAt = createdAt ? formatDate(createdAt) : 'Дата публикации не указана';
  const hasPositive = Boolean(positive_feedback?.trim());
  const hasNegative = Boolean(negative_feedback?.trim());

  return (
    <Block className="review-card__block animation-reveal">
      <div className="review-card">
        <div className="review-card__header">
          <span className="review-card__date">{safeCreatedAt}</span>
          <div className="review-card__rating">
            <StarRating rating={rating || 0} />
          </div>
        </div>

        <div className="review-card__user-row">
          <h3 className="review-card__author">{safeUserName}</h3>
          {is_verified && <span className="review-card__verified">Подтверждён</span>}
        </div>

        <p className="review-card__meta">
          Визит: {safeDateOfVisit} • {safeDepartment} • Врач: {safeDoctorName}
        </p>
        <ExpandableBlock>
          <div className="review-card__feedback">
            {hasPositive && (
              <>
                <h4 className="review-card__feedback-title">Что понравилось:</h4>

                <MultilineText text={positive_feedback} className={'review-card__text-desc'} />
              </>
            )}

            {hasNegative && (
              <>
                <h4 className="review-card__feedback-title">Что не понравилось / Что улучшить:</h4>
                <MultilineText text={negative_feedback} className={'review-card__text-desc'} />{' '}
              </>
            )}
          </div>
        </ExpandableBlock>
      </div>
    </Block>
  );
};
