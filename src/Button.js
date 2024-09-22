import { css } from "@emotion/react";
import { useSpring, animated } from "@react-spring/web";
import { useRef } from "react";
import useMouseEvents from "./utils/useMouseEvents";
import clamp from "./utils/clamp";

const calc = (x, y, rect, isMouseDown) => [
  clamp(-(y + 24 - rect.top - rect.height / 2) / 5, -24, 24),
  clamp((x - rect.left - rect.width / 2) / 5, -20, 20),
  isMouseDown ? 8 : 0,
  isMouseDown ? 8 : 0,
  1.2,
  180,
];

const trans = (x, y, tx, ty, s, r) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) translate(${tx}px, ${ty}px) scale(${s}) rotateY(${r}deg)`;

const transText = (x, y, tx, ty, s, r) => `rotateY(${r}deg)`;

export default function Button(props) {
  const cardRef = useRef(null);
  const config = {
    mass: 1,
    tension: 600,
    friction: 30,
    clamp: false,
    precision: 0.01,
    velocity: 0,
  };

  const [{ xys, ...style }, api] = useSpring(() => ({
    xys: [0, 0, 0, 0, 1, 0],
    boxShadow: "0 10px 20px -10px #333",
    config,
  }));

  const events = useMouseEvents(({ active, hover }, e) => {
    const rect = cardRef.current.getBoundingClientRect();
    api.start({
      xys:
        active || hover
          ? calc(e.clientX, e.clientY, rect, active)
          : [0, 0, 0, 0, 1, 0],
      boxShadow:
        active || hover ? "0 20px 40px -20px #eee" : "0 10px 20px -10px #333",
    });
  });

  return (
    <div
      ref={cardRef}
      style={props.style}
      css={css`
        display: inline-block;
        pointer-events: auto;
      `}
      {...events}
      onClick={props.onClick}
    >
      <animated.div
        css={css`
          position: relative;
          background: #48354a;
          display: inline-block;
          text-transform: uppercase;
          border-radius: 64px;
          font-size: 40px;
          user-select: none;
          cursor: pointer;
          text-align: center;
          width: 100%;
          border: 6px solid white;
        `}
        style={{ transform: xys.to(trans), ...style }}
      >
        <div
          css={css`
            border: 6px solid #6f5775;
            padding: 32px 120px;
            border-radius: 58px;
          `}
        >
          <animated.div
            css={css`
              position: relative;
              background: ${props.disabled ? "#59405c" : "#fefefd"};
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            `}
            style={{ transform: xys.to(transText) }}
          >
            {props.children}
          </animated.div>
        </div>
      </animated.div>
    </div>
  );
}
