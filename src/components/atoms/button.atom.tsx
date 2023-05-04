interface Props {
  text: string;
  onClick: Function;
  type: "btn-primary" | "btn-secondary" | "btn-accent";
}

export default ({ text, onClick, type }: Props) => {
  return (
    <button onClick={() => onClick()} className={`${type} btn`}>
      {text}
    </button>
  );
};
