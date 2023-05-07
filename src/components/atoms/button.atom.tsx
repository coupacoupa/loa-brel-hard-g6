interface Props {
  text: string;
  onClick: Function;
  type: "btn-primary" | "btn-secondary" | "btn-accent";
  disabled?: boolean;
}

export default ({ text, onClick, type, disabled = false }: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick()}
      className={`${type} btn`}
    >
      {text}
    </button>
  );
};
