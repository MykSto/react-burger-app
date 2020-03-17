import React from 'react';
import styles from './Input.module.css';

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [styles.InputElement];
  let errorMessage = null;

  if (props.invalid && props.shouldValidate && props.isTouched) {
    inputClasses.push(styles.Invalid);
    errorMessage = <p className={styles.ErrorMessage}>Please enter a valid input!</p>;
  }

  switch (props.elementType) {
  case ('input'):
    inputElement = (
      <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
    );
    break;
  case ('textarea'):
    inputElement = (
      <textarea
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
    );
    break;
  case ('select'):
    inputElement = (
      <select
        className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.changed}
      >
        {props.elementConfig.options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
        ))}
      </select>
    );
    break;
  default:
    inputElement = (
      <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />
    );
  }

  return (
    <div className={styles.Input}>
      {errorMessage}
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
