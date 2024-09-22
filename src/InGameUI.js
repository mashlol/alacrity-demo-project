import { css } from "@emotion/react";
import Flex from "./Flex";
import Button from "./Button";
import { animated, useTrail } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";
import useTextSpring from "./useTextSpring";

const AnimatedFlex = animated(Flex);

export function InGameUI(props) {
  const [chatMsg, setChatMsg] = useState("");
  const [chatMsgs, setChatMsgs] = useState(["hello!"]);
  const [springs] = useTrail(
    3,
    () => ({
      from: { opacity: 0, translateY: 200 },
      to: { opacity: 1, translateY: 0 },
    }),
    []
  );

  const scoreRef = useTextSpring(
    () => {
      return props.score;
    },
    (value) => {
      return Math.round(value);
    },
    {
      mass: 1,
      tension: 600,
      friction: 120,
      clamp: true,
      precision: 0.01,
      velocity: 0,
    }
  );

  const chatRef = useRef(null);

  useEffect(() => {
    const listener = (event) => {
      if (event.keyCode === 13) {
        // Enter
        chatRef.current.focus();
      }
      if (event.keyCode === 27) {
        // Escape
        chatRef.current.blur();
      }
    };

    window.addEventListener("keyup", listener);

    return () => window.removeEventListener("keyup", listener);
  }, []);

  useEffect(() => {
    const listener = (event) => {
      if (!(event.detail instanceof ArrayBuffer)) {
        setChatMsgs((old) => [...old, "Received from C#: " + event.detail]);
      }
    };

    window.addEventListener("unitydata", listener);

    return () => window.removeEventListener("unitydata", listener);
  }, []);

  return (
    <Flex
      alignItems="center"
      justifyContent="space-around"
      gap={20}
      xcss={css`
        margin-top: 20px;
      `}
    >
      <AnimatedFlex
        grow={1}
        basis={0}
        justifyContent="center"
        style={springs[0]}
      >
        <Button onClick={() => sendToUnity("spawn")}>Spawn Target</Button>
      </AnimatedFlex>
      <AnimatedFlex
        grow={1}
        basis={0}
        justifyContent="center"
        style={springs[1]}
      >
        <div
          css={css`
            font-size: 80px;
            color: #eee;
          `}
        >
          SCORE: <span ref={scoreRef} />
        </div>
      </AnimatedFlex>
      <AnimatedFlex
        grow={1}
        basis={0}
        justifyContent="center"
        style={springs[2]}
      >
        <Button onClick={() => props.onExit()}>Start Menu</Button>
      </AnimatedFlex>

      <div
        css={css`
          position: absolute;
          bottom: 20px;
          right: 20px;
        `}
      >
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();

            setChatMsg("");
            setChatMsgs((old) => [...old, "Name: " + chatMsg]);
          }}
        >
          <Flex direction="column" gap={12}>
            <div
              css={css`
                height: 180px;
                overflow-y: auto;
                background: rgba(0, 0, 0, 0.5);
                padding: 8px;
                border-radius: 8px;
                pointer-events: auto;
              `}
            >
              {chatMsgs.map((msg) => (
                <div
                  css={css`
                    user-select: text;
                    color: white;
                  `}
                >
                  [Channel] {msg}
                </div>
              ))}
            </div>
            <Flex gap={8}>
              <input
                css={css`
                  resize: none;
                  height: 32px;
                  width: 560px;
                  padding: 0 8px;
                  border-radius: 8px;
                  outline: none;
                  border: none;
                  background: rgba(0, 0, 0, 0.5);
                  color: white;
                `}
                type="text"
                placeholder="Send chat message..."
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                ref={chatRef}
              />
              <button
                css={css`
                  padding: 0 8px;
                  background: #48354a;
                  border: 2px solid #6f5775;
                  border-radius: 8px;
                  color: white;
                  text-transform: uppercase;
                `}
              >
                Send
              </button>
            </Flex>
          </Flex>
        </form>
      </div>
    </Flex>
  );
}
