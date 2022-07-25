import React, { FC } from 'react';
import Select from 'react-select';
import classes from './SelectFields.module.scss';

interface OptionType { 
  [key: string]: string 
};

interface SelectProps {
  onChange: (value: string) => void, 
  items: any[], 
  placeholder: string
}

const SelectField: FC<SelectProps> = ({ onChange, items, placeholder }) => {
  const options = items.map(item => ({ value: item.name, label: item.name }));

  return (
    <div className={classes.control}>
      <Select
          instanceId="long-value-select"
          placeholder={placeholder}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(newValue) => {
              const selected = newValue as OptionType;
              onChange(selected.value);
          }}
          options={options}
      />
    </div>
  );
}

export default SelectField;