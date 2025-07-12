import React, { useState, useEffect } from 'react';
import { UITextInput } from '../../ui-kits/text-input';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  placeholder = 'Search books...',
  debounceMs = 400,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(inputValue);
    }, debounceMs);
    return () => clearTimeout(handler);
  }, [inputValue, onChange, debounceMs]);

  return (
    <UITextInput
      name="search"
      placeHolder={placeholder}
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
      containerClass="md:w-[50%]"
      startIcon={
        <span role="img" aria-label="search">
          🔍
        </span>
      }
    />
  );
};
