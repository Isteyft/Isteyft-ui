import Button from "./Button.vue";
import { withInstall } from "@isteyft-ui/utils";
import ButtonGroup from "./ButtonGroup.vue";

export const IButton = withInstall(Button);
export const IButtonGroup = withInstall(ButtonGroup);

export * from "./types";