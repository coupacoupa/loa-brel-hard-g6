interface Props {
  id: string;
  children: JSX.Element;
}

export default ({ id, children }: Props) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          {children}
        </label>
      </label>
    </>
  );
};
