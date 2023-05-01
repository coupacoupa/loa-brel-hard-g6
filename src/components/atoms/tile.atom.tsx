interface Props {
  text: string;
  onClick: Function;
}

export default ({ text, onClick }: Props) => {
  return (
    <a
      className="flex aspect-square rotate-45 transform cursor-pointer items-center justify-center border-2 border-current px-6"
      onClick={() => onClick()}
    >
      <span className="-rotate-45 transform">{text}</span>
    </a>
  );
};
