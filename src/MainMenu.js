import { css } from "@emotion/react";
import Flex from "./Flex";
import { animated, useTrail } from "@react-spring/web";
import Button from "./Button";

const AnimatedButton = animated(Button);

export function MainMenu(props) {
  const [springs] = useTrail(
    5,
    () => ({
      from: { opacity: 0, translateY: 200 },
      to: { opacity: 1, translateY: 0 },
    }),
    []
  );

  return (
    <Flex
      justifyContent="space-around"
      gap={80}
      xcss={css`
        margin-right: 120px;
        margin-left: 120px;
      `}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        fullHeight
        xcss={css`
          font-size: 200px;
          color: #eee;
        `}
      >
        <animated.div
          style={springs[0]}
          css={css`
            max-width: 600px;
            line-height: 162px;
            color: #f8af2a;
            position: relative;
          `}
        >
          DEMO GAME
          <div
            css={css`
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              -webkit-text-stroke: 52px #111;
              z-index: -1;
            `}
          >
            DEMO GAME
          </div>
          <div
            css={css`
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              -webkit-text-stroke: 74px #eee;
              z-index: -2;
            `}
          >
            DEMO GAME
          </div>
        </animated.div>
      </Flex>
      <Flex
        direction="column"
        alignItems="stretch"
        justifyContent="center"
        gap={40}
        fullHeight
      >
        <AnimatedButton style={springs[1]} disabled>
          Continue
        </AnimatedButton>
        <AnimatedButton
          style={springs[2]}
          onClick={() => {
            sendToUnity("start");
            props.onStart();
          }}
        >
          New Game
        </AnimatedButton>
        <AnimatedButton style={springs[3]} disabled>
          Load Game
        </AnimatedButton>
        <AnimatedButton style={springs[4]} onClick={() => props.onSettings()}>
          Settings
        </AnimatedButton>
        <AnimatedButton
          style={springs[4]}
          onClick={() => {
            const array = new Uint8Array(4);
            array[0] = 1;
            array[1] = 2;
            array[2] = 3;
            array[3] = 4;
            sendToUnity(array.buffer);
          }}
        >
          Send Test Data
        </AnimatedButton>
      </Flex>
    </Flex>
  );
}
