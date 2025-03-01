import { useRef } from 'react';
import { Organization } from './const/Organization';
import { Button } from 'shared/ui/button';
import { Department } from 'pages/feedbackPage/const/Department';
import './feedback_form.scss';

import { Dropdown } from 'shared/ui/dropdown';
import { useAddNotification } from 'features/notifications';
import { RadioGroup } from 'shared/ui/radioGroup';
import { Input, InputPhone, InputText } from 'shared/ui/input';

type FieldType = {
  fio?: string;
  phone?: string;
  organization?: string;
  department?: string;
  doctor?: string;
  type_appeal?: string;
  messages?: string;
};
// const { TextArea } = Input;

export const FormFeedback = () => {
  // const { notification } = App.useApp();
  // AddNotification("Привет мир", "info");
  const addNotification = useAddNotification();

  const Push = () => {
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
      })
      .catch((error) => {
        console.error('Ошибка при отправке запроса:', error);
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

  return (
    <div className="Feedback">
      <h2 className="Feedback__title">Форма обратной связи</h2>
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
      <Button onClick={Push}>Отправить</Button>
    </div>
  );
};
