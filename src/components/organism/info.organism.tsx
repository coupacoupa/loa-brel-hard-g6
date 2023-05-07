interface Props {
  title: string;
  children: JSX.Element;
}

export default ({ title, children }: Props) => {
  return (
    <div className="mt-6">
      <h1 className="mb-4 text-center text-base font-medium sm:text-3xl">
        {title}
      </h1>
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
};
