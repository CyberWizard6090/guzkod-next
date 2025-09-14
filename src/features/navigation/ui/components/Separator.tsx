type SeparatorProps = {
  label: string;
};

export const Separator = ({ label }: SeparatorProps) => {
  return (
    <div className="navigation__separator" role="presentation">
      <span className="navigation__separator-label">{label}</span>
    </div>
  );
};
