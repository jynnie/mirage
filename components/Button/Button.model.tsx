import { ReactElement } from "react";

type ClickEvent = React.MouseEvent<HTMLElement>;

//* Button Component

export interface ButtonProps {
  className?: string;
  intent?: "primary" | "secondary" | "success" | "warning" | "danger";
  appearance?: "fill" | "outline" | "minimal";
  type?: "button" | "reset" | "submit";
  size?: "small" | "medium" | "large";
  shape?: "circle" | "square";
  onClick?: (evt?: ClickEvent | React.KeyboardEvent) => void | Promise<any>;
  disabled?: boolean;
  loading?: boolean;
  active?: boolean;
  icon?: ReactElement;
  children?: ReactElement | string;
}

//* useButton

export interface ButtonOptions extends ButtonProps {
  classPrefix?: string;
}

export type ButtonClickEvt = (evt: ClickEvent | React.KeyboardEvent) => void;
export type ButtonKeyEvt = (evt: React.KeyboardEvent) => void;

export interface ButtonInstance {
  props: {
    role: string;
    tabIndex: number;
    className: string;
    type: ButtonOptions["type"];
    onClick: ButtonClickEvt;
    onKeyDown: ButtonKeyEvt;
    onKeyUp: ButtonKeyEvt;
  };
  icon?: ReactElement;
  isLoading: boolean;
  isDisabled: boolean;
}
