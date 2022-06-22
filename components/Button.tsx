import React from "react";

type Props = {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  disabled?: boolean;
};

const Button = (props: Props) => {
  let textSize = "";
  let paddingSize = "";
  switch (props.size) {
    case "sm":
      textSize = "text-sm";
      paddingSize = "px-3 py-1";
      break;

    case "lg":
      textSize = "text-lg";
      paddingSize = "px-5 py-1";
      break;

    case "xl":
      textSize = "text-xl";
      paddingSize = "px-6 py-2";
      break;

    case "2xl":
      textSize = "text-2xl";
      paddingSize = "px-7 py-2";
      break;

    case "3xl":
      textSize = "text-3xl";
      paddingSize = "px-8 py-3";
      break;

    case "4xl":
      textSize = "text-4xl";
      paddingSize = "px-9 py-3";
      break;

    default:
      textSize = "text-base";
      paddingSize = "px-4 py-1";
      break;
  }

  if (props.primary)
    return (
      <button
        onClick={props.onClick}
        className={`relative -mt-1 rounded-xl border-2 border-primary bg-primary ${paddingSize} font-bold capitalize text-white shadow-regular shadow-primary-dark transition-all hover:border-primary-dark hover:bg-white hover:text-primary active:top-1 active:shadow-pressed ${textSize}`}
        disabled={props.disabled || false}
      >
        {props.children}
      </button>
    );

  return (
    // <button
    //   onClick={props.onClick}
    //   className={`relative rounded-xl border-2 border-secondary-dark hover:bg-secondary ${paddingSize} font-bold capitalize text-secondary-dark shadow-regular shadow-secondary-dark transition-all hover:border-secondary hover:text-white hover:shadow-secondary active:top-1 active:shadow-pressed ${textSize}`}
    // >
    //   {props.children}
    // </button>
    <button
      onClick={props.onClick}
      className={`relative -mt-1 rounded-xl border-2 border-secondary bg-secondary ${paddingSize} font-bold capitalize text-white shadow-regular shadow-secondary-dark transition-all hover:border-secondary-dark hover:bg-white hover:text-secondary active:top-1 active:shadow-pressed ${textSize}`}
      disabled={props.disabled || false}
    >
      {props.children}
    </button>
  );
};

export default Button;
