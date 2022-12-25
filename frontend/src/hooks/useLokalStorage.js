import { useState, useEffect } from 'react';

export default (key) => {
  const [value, setValue] = useState(localStorage.getItem(key));

  useEffect(() => {
    if (value) {
      localStorage.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue];
};
