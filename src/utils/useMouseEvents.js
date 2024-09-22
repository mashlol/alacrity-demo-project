import { useEffect, useRef } from "react";

export default function useMouseEvents(onChange) {
  const active = useRef(false);
  const hover = useRef(false);

  useEffect(() => {
    const mouseup = (e) => {
      if (active.current) {
        active.current = false;
        onChange({ active: active.current, hover: hover.current }, e);
      }
    };

    const mousemove = (e) => {
      if (active.current || hover.current) {
        onChange({ active: active.current, hover: hover.current }, e);
      }
    };

    window.addEventListener("mouseup", mouseup);
    window.addEventListener("mousemove", mousemove);

    return () => {
      window.removeEventListener("mouseup", mouseup);
      window.removeEventListener("mousemove", mousemove);
    };
  }, []);

  return {
    onMouseDown: (e) => {
      active.current = true;
      onChange({ active: active.current, hover: hover.current }, e);
    },
    onMouseEnter: (e) => {
      hover.current = true;
      onChange({ active: active.current, hover: hover.current }, e);
    },
    onMouseLeave: (e) => {
      hover.current = false;
      onChange({ active: active.current, hover: hover.current }, e);
    },
  };
}
