import { WarningCircle, CheckCircle } from "phosphor-react";

function ErrorORSuccess({ falha }: { falha: boolean }) {
  return falha ? (
    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
      <WarningCircle size={32} />
    </div>
  ) : (
    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
      <CheckCircle size={32} />
    </div>
  );
}

export default ErrorORSuccess;
