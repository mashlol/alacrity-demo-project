import { useRef } from "react";
import useFrame from "./useFrame";
import { useSpringValue } from "@react-spring/web";

export default function useTextSpring(valueCallback, textCallback, config) {
  const ref = useRef();

  const valueSpring = useSpringValue(valueCallback(), { config: config });

  useFrame(() => {
    valueSpring.start(valueCallback());
    if (ref.current != null) {
      ref.current.innerText = textCallback(valueSpring.get());
    }
  });

  return ref;
}
