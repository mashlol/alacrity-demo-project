import { css } from "@emotion/react";

export default function Flex(props) {
  return (
    <div
      css={[
        css`
          display: flex;
          flex-direction: ${props.direction};
          align-items: ${props.alignItems};
          gap: ${props.gap}px;
          justify-content: ${props.justifyContent};
          flex-grow: ${props.grow};
          flex-shrink: ${props.shrink};
          flex-basis: ${props.basis};
        `,
        props.xcss,
        props.fullHeight &&
          css`
            height: 100vh;
          `,
      ]}
      style={props.style}
    >
      {props.children}
    </div>
  );
}
