import React from "react";
import cn from "classnames";
import type {
  ButtonOptions,
  ButtonInstance,
  ButtonClickEvt,
  ButtonKeyEvt,
} from "./Button.model";

// TODO: Support className
// TODO: Support intent
// TODO: Appearance fill vs. outlined?

export function useButton({
  classPrefix = "jnpr-button",
  intent = "primary",
  type = "button",
  size = "medium",
  shape,
  onClick,
  disabled = false,
  loading = false,
  active = false,
  icon: rawIcon,
}: ButtonOptions): ButtonInstance {
  const [isLoading, setIsLoading] = React.useState(loading);
  const [isActive, setIsActive] = React.useState(active);
  const isBusy = disabled || isLoading;

  const icon =
    rawIcon &&
    React.cloneElement(rawIcon, {
      className: cn(rawIcon.props?.className, "jnpr-button-icon"),
    });

  React.useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const handleClick: ButtonClickEvt = (evt) => {
    if (isBusy || !onClick) return;

    let onClickResult = null;
    if (onClick instanceof Function) onClickResult = onClick(evt);

    const isPromise = onClickResult instanceof Promise;
    if (isPromise) {
      setIsLoading(true);
      onClickResult.then(() => {
        setIsLoading(false);
      });
    }
  };

  const handleKeyDown: ButtonKeyEvt = (evt) => {
    if (evt.code === "Space" || evt.code === "Enter") {
      evt.preventDefault();
      handleClick(evt);
      setIsActive(true);
    }
  };

  const handleKeyUp: ButtonKeyEvt = (evt) => {
    if (evt.code === "Space" || evt.code === "Enter") {
      setIsActive(false);
    }
  };

  const classPrefixHyphen = classPrefix ? classPrefix + "-" : "";

  const props = {
    role: "button",
    tabIndex: isBusy ? -1 : 0,
    className: cn(
      classPrefix,
      `${classPrefixHyphen}${size}`,
      `${classPrefixHyphen}${shape}`,
      {
        disabled: disabled || isLoading,
        active: isActive,
      },
    ),
    type: type,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
  };

  return {
    props,
    icon,
    isLoading,
    isDisabled: disabled || isLoading,
  };
}

export default useButton;
