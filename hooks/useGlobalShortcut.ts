import { useEffect } from "react";

type Props = {
  [key in keyof WindowEventMap]?: EventListenerOrEventListenerObject;
};

export default function useGlobalShortcut(props: Props) {
  useEffect(() => {
    for (let [key, func] of Object.entries(props)) {
      window.addEventListener(key, func, false);
    }
    return () => {
      for (let [key, func] of Object.entries(props)) {
        window.removeEventListener(key, func, false);
      }
    };
  }, []);
}