interface Props {
  text: number;
  border?: string;
  background: string;
  size: number;
}

export default ({ text, border, background, size }: Props) => {
  return (
    <div
      className={`flex h-${size} w-${size} items-center justify-center rounded-full text-xs text-gray-700 ${
        border ? `border-2 border-${border}-600` : undefined
      } bg-${background}-200`}
    >
      {text}
    </div>
  );
};
