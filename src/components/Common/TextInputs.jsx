import { TextField } from "@material-ui/core";
import { useState } from "react";

export const OutLinedInput = props => {
  const {
    id,
    label,
    showLabel,
    value,
    error,
    errorMsg,
    placeHolder,
    className,
    handleChange,
    handleKeyPress,
  } = props;
  const [activeLabel, setActiveLabel] = useState(false);

  return (
    <TextField
      // id={id}
      label={showLabel ? label : activeLabel ? label : null}
      variant="outlined"
      value={value}
      placeholder={placeHolder}
      error={error}
      onClick={e => setActiveLabel(true)}
      helperText={errorMsg}
      color="primary"
      className={className}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
};

// export { OutLinedInput };
