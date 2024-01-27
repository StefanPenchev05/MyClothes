import { useState, useEffect } from "react";

function useLocalStorage(key: string, initialValue: string | undefined) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue !== null) {
      try {
        return JSON.parse(jsonValue);
      } catch (error) {
        console.error("Unable to parse JSON:", error);
        return initialValue;
      }
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    console.log('useEffect')
    console.log(key)
    console.log(value)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.target instanceof HTMLInputElement &&
          mutation.target.id === key
        ) {
          setValue(mutation.target.value || undefined);
        }
      });
    });

    const inputEl = document.createElement("input");
    inputEl.id = key;
    inputEl.value = localStorage.getItem(key) || "";
    inputEl.style.display = "block";
    document.body.appendChild(inputEl);

    observer.observe(inputEl, { attributes: true, attributeFilter: ["value"] });

    return () => {
      observer.disconnect();
      document.body.removeChild(inputEl);
    };
  }, [key]);

  useEffect(() => {
    const inputEl = document.getElementById(key) as HTMLInputElement;
    if (inputEl) {
      inputEl.value = JSON.stringify(value);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
