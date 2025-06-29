'use client';
import React, { useState } from 'react';
import { Organization } from './const/Organization';
import { Department } from './const/Department';
import { Button } from 'shared/ui/button';
import { Dropdown } from 'shared/ui/dropdown';
import { useAddNotification } from 'features/notifications';
import { RadioGroup } from 'shared/ui/radio-group';
import { Input, InputPhone, Textarea } from 'shared/ui/input';
import { Block } from 'shared/ui/block';
import { Checkbox } from 'shared/ui/checkbox';
import './FeedbackForm.scss';

type FieldType = {
  fio: string;
  phone: string;
  organization: string;
  department: string;
  doctor: string;
  type_appeal: string;
  messages: string;
};

export const FormFeedback = () => {
  const addNotification = useAddNotification();

  const [formData, setFormData] = useState<FieldType>({
    fio: '',
    phone: '',
    organization: '',
    department: '',
    doctor: '',
    type_appeal: '',
    messages: '',
  });

  const [isChecked, setIsChecked] = useState(false);

  const updateField = <K extends keyof FieldType>(field: K, value: FieldType[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const Push = () => {
    fetch('http://localhost:4000/api/FeedbackMessages', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then(() => {
        addNotification({ message: 'Отправлено успешно', type: 'success' });
        setFormData({
          fio: '',
          phone: '',
          organization: '',
          department: '',
          doctor: '',
          type_appeal: '',
          messages: '',
        });
        setIsChecked(false);
      })
      .catch((err) => {
        console.error('Ошибка при отправке:', err);
        addNotification({ message: 'Ошибка при отправке сообщения', type: 'error' });
      });
  };

  const handleReset = () => {
    setFormData({
      fio: '',
      phone: '',
      organization: '',
      department: '',
      doctor: '',
      type_appeal: '',
      messages: '',
    });
    setIsChecked(false);
  };

  return (
    <Block>
      <div className="Feedback">
        <h1 className="Feedback__title">Форма обратной связи</h1>

        <Input
          label="Ваше Фамилия Имя Отчество (при наличии)"
          placeholder="Фамилия Имя Отчество"
          value={formData.fio}
          onChange={(val) => updateField('fio', val)}
          name={''}
        />

        <InputPhone
          label="Номер телефона"
          value={formData.phone}
          onChange={(val) => updateField('phone', val)}
          name={''}
        />

        <RadioGroup
          name="TypeTreatment"
          label="Тип обращения"
          options={[
            { label: 'Жалоба', value: 'Жалоба' },
            { label: 'Благодарность', value: 'Благодарность' },
            { label: 'Вопрос', value: 'Вопрос' },
            { label: 'Обращение', value: 'Обращение' },
          ]}
          value={formData.type_appeal}
          onChange={(val: string) => updateField('type_appeal', val)}
        />

        <Dropdown
          label="Выберите учреждение"
          options={Organization}
          value={formData.organization}
          onChange={(val: string) => updateField('organization', val)}
        />

        <Dropdown
          label="Выберите отделение"
          options={Department}
          value={formData.department}
          onChange={(val: string) => updateField('department', val)}
        />

        <Input
          label="Выберите врача"
          placeholder="Фамилия Имя Отчество"
          value={formData.doctor}
          onChange={(val) => updateField('doctor', val)}
          name={''}
        />

        <Textarea
          maxLength={600}
          label="Сообщение"
          value={formData.messages}
          onChange={(val: string) => updateField('messages', val)}
        />

        <Checkbox checked={isChecked} onChange={setIsChecked}>
          Согласен с условиями политики обработки{' '}
          <a href="/privacy-policy" target="_blank" rel="noreferrer">
            персональных данных
          </a>
        </Checkbox>

        <div className="Feedback__buttons">
          <Button variant="secondary" onClick={handleReset}>
            Сбросить
          </Button>
          <Button onClick={Push} disabled={!isChecked}>
            Отправить
          </Button>
        </div>
      </div>
    </Block>
  );
};
