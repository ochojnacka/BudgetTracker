import React from 'react';

const InputCard = ({ name, value, onChange, placeholder, label, type }) => {
  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <div className="control">
        <input
          className="input is-rounded"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputCard;