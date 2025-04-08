import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3";
import { fn, within, userEvent, expect } from "@storybook/test";
import {IButton} from 'Isteyft-ui'

type Story = StoryObj<typeof IButton> & { argTypes: ArgTypes };

const meta: Meta<typeof IButton> = {
  title: "Example/Button",
  component: IButton,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    size: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    useThrottle: {
      control: "boolean",
    },
    throttleDuration: {
      control: "number",
    },
    autofocus: {
      control: "boolean",
    },
    tag: {
      control: { type: "select" },
      options: ["button", "a", "div"],
    },
    nativeType: {
      control: { type: "select" },
      options: ["button", "submit", "reset", ""],
    },
    icon: {
      control: { type: "text" },
    },
    loadingIcon: {
      control: { type: "text" },
    },
  },
  args: { onClick: fn() },
};

const container = (val: string) => `
<div style="margin:5px">
  ${val}
</div>
`;

export const Default: Story & { args:  { content: string } } = {
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
  args: {
    type: "primary",
    content: "Button",
  },
  render: (args) => ({
    components: { IButton },
    setup() {
      return { args };
    },
    template: container(
      `<i-button data-testid="story-test-btn" v-bind="args">{{args.content}}</i-button>`
    ),
  }),

  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step("click btn", async () => {
      await userEvent.click(canvas.getByRole("button"));
    })
    expect(args.onClick).toHaveBeenCalled();
    // await step("test useThrottle is true", async () => {
    //   args.useThrottle = true;
    //   await userEvent.tripleClick(canvas.getByTestId("story-test-btn"));
    //   expect(args.onClick).toHaveBeenCalledOnce();
    // });
    // await step("test useThrottle is false",async()=> {
    //   args.useThrottle = false;
    //   await userEvent.tripleClick(canvas.getByTestId("story-test-btn"));
    //   expect(args.onClick).toHaveBeenCalledTimes(4)
    // })
  },
};

export default meta;