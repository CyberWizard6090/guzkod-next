import { NavSeparator } from 'features/navigation/model/types/navigation';

export const Separator = ({ label }: NavSeparator) => {
  return (
    <div className="navigation__separator" role="presentation">
      <span className="navigation__separator-label">{label}</span>
    </div>
  );
};
