interface Props {
  text: number;
  focused?: boolean;
  background: string;
  size: number;
}

export default ({ text, focused = false, background, size }: Props) => {
  return (
    <div
      className={`flex h-${size} w-${size} items-center justify-center rounded-full text-xs text-neutral ${
        focused
          ? `bg-${background}-500 border-2 border-${background}-600`
          : `bg-${background}-300`
      }`}
    >
      {text}
    </div>
  );
};
