'use client';
import React, { useState } from 'react';
import { Block } from 'shared/ui/block';
import { Input, InputPhone, Textarea } from 'shared/ui/input';
import { StarRating } from 'shared/ui/star-rating';
import { Department } from '../const/Department';
import { Dropdown } from 'shared/ui/dropdown';
import { Checkbox } from 'shared/ui/checkbox';
import { Button } from 'shared/ui/button';
import './ReviewForm.scss';
import { DatePicker } from 'shared/ui/day-picker';
import AlignWrapper from 'shared/ui/align-wrapper';
import { useAddNotification } from 'features/notifications';

type Props = {};

type FieldType = {
  date_of_visit: string; // Дата посещения
  department: string; // Отделение / филиал (select)
  doctor_name: string; // Имя врача (опционально)
  rating: number; // Оценка (1–5)
  positive_feedback: string; // Что понравилось (textarea)
  negative_feedback: string; // Что не понравилось / Что улучшить (textarea)
  is_anonymous: boolean; // Оставить отзыв анонимно (boolean)
  user_name: string; // Имя пользователя (если не анонимно)
  contact_info: string; // Телефон или email (опционально)
  consent: boolean; // Согласие на обработку данных (checkbox)
  allow_publication: boolean; // Разрешение на публикацию (checkbox)
};

const initialFormData: FieldType = {
  date_of_visit: '',
  department: '',
  doctor_name: '',
  rating: 0,
  positive_feedback: '',
  negative_feedback: '',
  is_anonymous: false,
  user_name: '',
  contact_info: '',
  consent: false,
  allow_publication: true,
};

export const ReviewForm = (props: Props) => {
  const addNotification = useAddNotification();
  const [formData, setFormData] = useState<FieldType>(initialFormData);

  const updateField = <K extends keyof FieldType>(field: K, value: FieldType[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = () => {
    if (!formData.consent) return;
    fetch('http://localhost:4000/api/reviews', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then(() => {
        addNotification({ message: 'Ваш отзыв успешно отправлен', type: 'success' });
        handleReset();
      })
      .catch((err) => {
        console.error('Ошибка при отправке:', err);
        addNotification({ message: 'Ошибка при отправке отзыва', type: 'error' });
      });
  };

  return (
    <Block className="review-form">
      <AlignWrapper align={'center'}>
        <h1>Отзыв</h1>
      </AlignWrapper>

      <DatePicker
        label="Дата посещения"
        value={formData.date_of_visit}
        onChange={(val) => updateField('date_of_visit', val)}
        name="date_of_visit"
      />

      <Dropdown
        label="Отделение / филиал"
        options={Department}
        value={formData.department}
        onChange={(val: string) => updateField('department', val)}
      />

      <Input
        label="Имя врача (опционально)"
        placeholder="Фамилия Имя Отчество"
        value={formData.doctor_name}
        onChange={(val) => updateField('doctor_name', val)}
        name="doctor_name"
      />

      <StarRating
        label="Поставьте оценку от 1 до 5 звёзд — насколько вы остались довольны."
        value={formData.rating.toString()}
        onChange={(val: string) => updateField('rating', Number(val))}
        name={''}
      />

      <Textarea
        maxLength={600}
        label="Что понравилось"
        placeholder="Расскажите, что оставило приятное впечатление."
        value={formData.positive_feedback}
        onChange={(val: string) => updateField('positive_feedback', val)}
      />

      <Textarea
        maxLength={600}
        label="Что не понравилось / Что улучшить"
        placeholder="Если что-то пошло не так — напишите, это поможет нам стать лучше."
        value={formData.negative_feedback}
        onChange={(val: string) => updateField('negative_feedback', val)}
      />

      <Checkbox
        checked={formData.is_anonymous}
        onChange={(val) => updateField('is_anonymous', val)}
      >
        Оставить отзыв анонимно
      </Checkbox>

      {!formData.is_anonymous && (
        <Input
          label="Ваше имя"
          placeholder="Напишите, как к вам обращаться."
          value={formData.user_name}
          onChange={(val) => updateField('user_name', val)}
          name="user_name"
        />
      )}

      <InputPhone
        label="Контакт (телефон или email, опционально)"
        value={formData.contact_info}
        onChange={(val) => updateField('contact_info', val)}
        name="contact_info"
      />

      <Checkbox checked={formData.consent} onChange={(val) => updateField('consent', val)}>
        Согласен с условиями политики обработки{' '}
        <a href="/privacy-policy" target="_blank" rel="noreferrer">
          персональных данных
        </a>
      </Checkbox>

      <Checkbox
        checked={formData.allow_publication}
        onChange={(val) => updateField('allow_publication', val)}
      >
        Разрешить публикацию отзыва на сайте
      </Checkbox>

      <div className="review-form__button-group">
        <Button variant="secondary" onClick={handleReset}>
          Сбросить
        </Button>
        <Button onClick={handleSubmit} disabled={!formData.consent}>
          Отправить
        </Button>
      </div>
    </Block>
  );
};
