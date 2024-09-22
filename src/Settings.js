import Flex from "./Flex";
import Button from "./Button";
import { animated, useTrail } from "@react-spring/web";
import { SettingToggle } from "./SettingToggle";

const AnimatedSettingToggle = animated(SettingToggle);

export function Settings(props) {
  const [springs] = useTrail(
    3,
    () => ({
      from: { opacity: 0, translateY: 200 },
      to: { opacity: 1, translateY: 0 },
    }),
    []
  );

  return (
    <div>
      <Button
        style={{ position: "absolute", top: 50, left: 80 }}
        onClick={props.onBack}
      >
        {"🠔 GO BACK"}
      </Button>
      <Flex fullHeight alignItems="center" justifyContent="center" gap={40}>
        <AnimatedSettingToggle style={springs[0]}>1</AnimatedSettingToggle>
        <AnimatedSettingToggle style={springs[1]}>2</AnimatedSettingToggle>
        <AnimatedSettingToggle style={springs[2]}>3</AnimatedSettingToggle>
      </Flex>
    </div>
  );
}
