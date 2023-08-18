interface TriggerElementProps {
  onClick: () => void;
  children: JSX.Element;
}

export const TriggerElement = (props: TriggerElementProps) => {
  const { children, onClick } = props;

  return children ? <children.type onClick={onClick} {...children.props} /> : null;
};
