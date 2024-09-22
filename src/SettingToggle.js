import { css } from "@emotion/react";
import Flex from "./Flex";
import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";
import useMouseEvents from "./utils/useMouseEvents";

export function SettingToggle(props) {
  const config = {
    mass: 1,
    tension: 600,
    friction: 20,
    clamp: false,
    precision: 0.01,
    velocity: 0,
  };

  const [style, api] = useSpring(() => ({
    scale: 1,
    config,
  }));

  const events = useMouseEvents(({ active, hover }, e) => {
    let scale = 1;
    if (active) {
      scale = 0.7;
    } else if (hover) {
      scale = 1.2;
    }

    api.start({
      scale: scale,
    });
  });

  const [active, setActive] = useState(true);

  return (
    <div style={props.style}>
      <animated.div
        style={style}
        css={css`
          border: 6px solid white;
          border-radius: 50%;
          pointer-events: auto;
        `}
        {...events}
        onClick={() => setActive((o) => !o)}
      >
        <div
          css={css`
            background: #197c8e;
            border-radius: 50%;
            width: 180px;
            height: 180px;
            font-size: 80px;
            color: ${active ? "white" : "#0c3e47"};
            border: 14px solid #2cb7c9;
          `}
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            xcss={css`
              height: 100%;
            `}
          >
            {props.children}
          </Flex>
        </div>
      </animated.div>
    </div>
  );
}
