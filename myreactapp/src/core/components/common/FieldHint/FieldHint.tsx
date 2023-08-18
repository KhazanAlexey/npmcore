import cn from 'classnames';

interface FieldHintProps {
  classes?: string;
  hint: string;
}

export const FieldHint = (props: FieldHintProps) => {
  const { classes, hint } = props;

  return <span className={cn('field-hint', classes)}>{hint}</span>;
};
