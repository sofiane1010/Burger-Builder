import React, { Component } from "react";

import classes from "./Input.module.css";

class Input extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.inputAttributes.value !== this.props.inputAttributes.value;
  }

  render() {
    const {
      errorMessage,
      isValid,
      changed,
      inputType,
      inputAttributes,
      labelAttributes,
      options,
    } = this.props;
    let inputElement;
    const inputClass = [classes.InputElement];
    let invalidInput = <p className={classes.InvalidInput}>{errorMessage}</p>;
    if (!isValid && changed) inputClass.push(classes.Invalid);

    switch (inputType) {
      case "input":
        inputElement = (
          <input className={inputClass.join(" ")} {...inputAttributes} />
        );
        break;
      case "textarea":
        inputElement = (
          <textarea className={inputClass.join(" ")} {...inputAttributes} />
        );
        break;
      case "select":
        inputElement = (
          <select className={inputClass.join(" ")} {...inputAttributes}>
            <option></option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.content}
              </option>
            ))}
          </select>
        );
        break;
      default:
        break;
    }
    return (
      <div className={classes.Input}>
        <label className={classes.Label} htmlFor={labelAttributes.htmlFor}>
          {labelAttributes.value}
        </label>
        {inputElement}
        {invalidInput}
      </div>
    );
  }
}

export default Input;
