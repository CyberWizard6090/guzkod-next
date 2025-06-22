'use client';
import { useRef, useState } from 'react';
import { Organization } from './const/Organization';
import { Button } from 'shared/ui/button';
import { Dropdown } from 'shared/ui/dropdown';
import { useAddNotification } from 'features/notifications';
import { RadioGroup } from 'shared/ui/radio-group';
import { Input, InputPhone, InputText } from 'shared/ui/input';
import { Block } from 'shared/ui/block';
import './feedback_form.scss';
import { Department } from './const/Department';
import { Checkbox } from 'shared/ui/checkbox';

type FieldType = {
  fio?: string;
  phone?: string;
  organization?: string;
  department?: string;
  doctor?: string;
  type_appeal?: string;
  messages?: string;
};

export const FormFeedback = () => {
  const addNotification = useAddNotification();

  const Push = () => {
    if (!inputRef.current.fio || !inputRef.current.phone || !inputRef.current.messages) {
      addNotification({ message: 'Пожалуйста, заполните все обязательные поля', type: 'error' });
      return;
    }
    fetch('http://localhost:4000/api/FeedbackMessages', {
      method: 'POST',
      body: JSON.stringify(inputRef.current),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log('Статус:', data);
        addNotification({ message: 'Отправлено успешно', type: 'success' });
        inputRef.current = {
          fio: '',
          phone: '',
          organization: '',
          department: '',
          doctor: '',
          type_appeal: '',
          messages: '',
        };
      })
      .catch((error) => {
        console.error('Ошибка при отправке:', error);
        addNotification({ message: 'Ошибка при отправке сообщения', type: 'error' });
      });
  };

  const inputRef = useRef<FieldType>({
    fio: '',
    phone: '',
    organization: '',
    department: '',
    doctor: '',
    type_appeal: '',
    messages: '',
  });
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Block>
      <div className="Feedback">
        <h1 className="Feedback__title">Форма обратной связи</h1>
        <Input
          label={'Ваше Фамилия Имя Отчество (при наличии)'}
          placeholder={'Фамилия Имя Отчество'}
          fieldName="fio"
          valueRef={inputRef}
        />
        <InputPhone label={'Номер телефона'} fieldName={'phone'} valueRef={inputRef} />

        <RadioGroup
          name="TypeTreatment"
          label="Тип обращения"
          fieldName={'type_appeal'}
          valueRef={inputRef}
          options={[
            { label: 'Жалоба', value: 'Жалоба' },
            { label: 'Благодарность', value: 'Благодарность' },
            { label: 'Вопрос', value: 'Вопрос' },
            { label: 'Обращение', value: 'Обращение' },
          ]}
        />
        <Dropdown
          label={'Выберите учреждение'}
          options={Organization}
          fieldName={'organization'}
          valueRef={inputRef}
        />
        <Dropdown
          label={'Выберите отделение'}
          options={Department}
          fieldName={'department'}
          valueRef={inputRef}
        />
        <Input
          label={'Выберите врача'}
          placeholder={'Фамилия Имя Отчество'}
          fieldName="doctor"
          valueRef={inputRef}
        />
        <InputText maxLength={600} label={'Сообщение'} fieldName="messages" valueRef={inputRef} />
        <Checkbox checked={isChecked} onChange={setIsChecked}>
          Согласен с условиями политики обработки
          <a href="/privacy-policy" target="_blank">
            {' персональных данных'}
          </a>
        </Checkbox>
        <Button onClick={Push} disabled={!isChecked}>
          Отправить
        </Button>
      </div>
    </Block>
  );
};
