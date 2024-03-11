import { useEffect, useRef } from "react";

export function useOutsideClick(hanler, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handlerClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          hanler();
        }
      }
      document.addEventListener("click", handlerClick, listenCapturing);
      return () =>
        document.removeEventListener("click", handlerClick, listenCapturing);
    },
    [hanler, listenCapturing]
  );
  return ref;
}

export default useOutsideClick;