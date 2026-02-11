
/*
PURPOSE:
Debounce hook for search bar.
Prevents API call on every keystroke.
Returns debounced value after delay.
*/

import { useEffect, useState } from "react";

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Start timer when value changes
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup previous timer if user types again quickly
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

