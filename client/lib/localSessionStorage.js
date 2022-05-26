
import { useState, useEffect } from "react";

export function add_to_history(data){
    const local_history = JSON.parse(localStorage.getItem('history'))
    if(local_history && local_history.length > 0){ 
        if(local_history?.at(-1).title !== data.title) { localStorage.setItem("history", JSON.stringify([...local_history, data])) }
    }else{ localStorage.setItem('history', JSON.stringify([data])) }
    const session_history = JSON.parse(sessionStorage.getItem('history'))
    if(session_history && local_history.length > 0){ 
        if(local_history?.at(-1).title !== data.title) {
          sessionStorage.setItem("history", JSON.stringify([...session_history, data])) 
        }
    }else{ sessionStorage.setItem('history', JSON.stringify([data])) }
    return JSON.parse(sessionStorage.getItem('history'))
}


function getStorageValue(key, defaultValue) {
  // getting stored value
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : defaultValue;
    return initial;
  }
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};