import React from 'react';

type Props = {
  ID: string;
  Name: string;
  labelElement: string;
  Value: string;
  state?: boolean;
  onClick?: () => void | any;
};

export const Radio = ({ ID, Name, Value, labelElement, onClick }: Props) => {
  const [isSelected, setisSelected] = React.useState(true);

  const handleChange = () => {
    setisSelected(!isSelected);
  };
  return (
    <div className="Radio">
      <input
        type="radio"
        id={ID}
        onChange={handleChange}
        onClick={onClick}
        value={Value}
        name={Name}
      />
      <label htmlFor={ID}>{labelElement}</label>
    </div>
  );
};
