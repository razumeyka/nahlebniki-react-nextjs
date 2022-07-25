import React, { useState, FC } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import classes from './SelectFields.module.scss';

const animatedComponents = makeAnimated();

type OptionType = { [key: string]: string };

const options: OptionType[] = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

interface SelectProps {
  onChange: (values: string[]) => void, 
  items: any[], 
  placeholder: string
}

const SelectMultiField: FC<SelectProps> = ({ placeholder, items, onChange }) => {
  const options = items.map(item => ({ value: item.name, label: item.name }));
  
  return (
    <div className={classes.control}>
      <Select
          instanceId="long-value-select"
          isMulti
          isSearchable
          placeholder={placeholder}
          closeMenuOnSelect={false}
          className="basic-multi-select"
          classNamePrefix="select"
          components={animatedComponents}
          onChange={(newValue) => {
              const selected = newValue as OptionType[];
              onChange(selected.map((option: OptionType ) => option.value))
          }}
          options={options}
      />
    </div>
  );
}

export default SelectMultiField;