interface CheckRadioLabelProps {
  label: string;
}

export const CheckRadioLabel = (props: CheckRadioLabelProps) => {
  const { label } = props;

  return (
    <>
      <span />
      {label}
    </>
  );
};
