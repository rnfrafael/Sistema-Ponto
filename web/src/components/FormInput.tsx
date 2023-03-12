import React from "react";

type Props = {
  label: string;
  idEName: string;
  type: string;
  placeholder: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

const FormInput = (props: Props) => {
  function handleState(event: React.ChangeEvent<HTMLInputElement>) {}

  return (
    <div className="mb-4">
      <label
        className="block font-medium text-gray-700 mb-2"
        htmlFor={props.idEName}
      >
        {props.label}
      </label>
      <input
        className="placeholder:text-xs w-full appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
        id={props.idEName}
        name={props.idEName}
        type={props.type}
        placeholder={props.placeholder}
        value={props.state}
        onChange={handleState}
        required
      />
    </div>
  );
};

export default FormInput;
