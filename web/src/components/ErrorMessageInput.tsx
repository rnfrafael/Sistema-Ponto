type Props = { mensagem: string };

const ErrorMessageInput = ({ mensagem }: Props) => {
  if (!mensagem) return null;
  return <div className="text-red-500 mt-2 text-xs">{mensagem}</div>;
};

export default ErrorMessageInput;
