import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3";
import { fn, within, userEvent, expect, clearAllMocks } from "@storybook/test";
import { set } from "lodash-es";

import { IButton, IButtonGroup } from "Isteyft-ui";
import 'toy-element/dist/theme/Button.css';

type Story = StoryObj<typeof IButton> & { argTypes?: ArgTypes };

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

export const Default: Story & { args: { content: string } } = {
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
    const btn = canvas.getByTestId("story-test-btn");

    await step(
      "When useThrottle is set to true, the onClick should be called once",
      async () => {
        set(args, "useThrottle", true);
        await userEvent.tripleClick(btn);

        expect(args.onClick).toHaveBeenCalledOnce();
        clearAllMocks();
      }
    );

    await step(
      "When useThrottle is set to false, the onClick should be called three times",
      async () => {
        set(args, "useThrottle", false);
        await userEvent.tripleClick(btn);

        expect(args.onClick).toHaveBeenCalledTimes(3);
        clearAllMocks();
      }
    );

    await step(
      "When disabled is set to true, the onClick should not be called",
      async () => {
        set(args, "disabled", true);
        await userEvent.click(btn);

        expect(args.onClick).toHaveBeenCalledTimes(0);
        set(args, "disabled", false);
        clearAllMocks();
      }
    );

    await step(
      "When loading is set to true, the onClick should not be called",
      async () => {
        set(args, "loading", true);
        await userEvent.click(btn);

        expect(args.onClick).toHaveBeenCalledTimes(0);
        set(args, "loading", false);
        clearAllMocks();
      }
    );
  },
};

export const Autofocus: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
  args: {
    content: "Button",
    autofocus: true,
  },
  render: (args) => ({
    components: { IButton },
    setup() {
      return { args };
    },
    template: container(
      `
      <p>请点击浏览器的刷新页面来获取按钮聚焦</p>
      <i-button data-testid="story-test-btn" v-bind="args">{{args.content}}</i-button>
      `
    ),
  }),
  play: async ({ args }) => {
    await userEvent.keyboard("{enter}");

    expect(args.onClick).toHaveBeenCalledOnce();
    clearAllMocks();
  },
};

export const Circle: Story = {
  args: {
    icon: "search",
  },
  render: (args) => ({
    components: { IButton },
    setup() {
      return { args };
    },
    template: container(`
      <i-button circle v-bind="args"/>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step("click button", async () => {
      await userEvent.click(canvas.getByRole("button"));
    });

    expect(args.onClick).toHaveBeenCalled();
  },
};

export const Group: Story & { args: { content1: string; content2: string } } = {
  argTypes: {
    groupType: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    groupSize: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
    },
    groupDisabled: {
      control: "boolean",
    },
    content1: {
      control: { type: "text" },
      defaultValue: "Button1",
    },
    content2: {
      control: { type: "text" },
      defaultValue: "Button2",
    },
  },
  args: {
    round: true,
    content1: "Button1",
    content2: "Button2",
  },
  render: (args) => ({
    components: { IButton, IButtonGroup },
    setup() {
      return { args };
    },
    template: container(`
       <i-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
         <i-button v-bind="args">{{args.content1}}</i-button>
         <i-button v-bind="args">{{args.content2}}</i-button>
       </i-button-group>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step("click btn1", async () => {
      await userEvent.click(canvas.getByText("Button1"));
    });
    await step("click btn2", async () => {
      await userEvent.click(canvas.getByText("Button2"));
    });
    expect(args.onClick).toHaveBeenCalled();
  },
};

export default meta;

// import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3";
// import { fn, within, userEvent, expect } from "@storybook/test";
// import {IButton, IButtonGroup} from 'Isteyft-ui'

// type Story = StoryObj<typeof IButton> & { argTypes?: ArgTypes };

// const meta: Meta<typeof IButton> = {
//   title: "Example/Button",
//   component: IButton,
//   tags: ["autodocs"],
//   argTypes: {
//     type: {
//       control: { type: "select" },
//       options: ["primary", "success", "warning", "danger", "info", ""],
//     },
//     size: {
//       control: { type: "select" },
//       options: ["large", "default", "small", ""],
//     },
//     disabled: {
//       control: "boolean",
//     },
//     loading: {
//       control: "boolean",
//     },
//     useThrottle: {
//       control: "boolean",
//     },
//     throttleDuration: {
//       control: "number",
//     },
//     autofocus: {
//       control: "boolean",
//     },
//     tag: {
//       control: { type: "select" },
//       options: ["button", "a", "div"],
//     },
//     nativeType: {
//       control: { type: "select" },
//       options: ["button", "submit", "reset", ""],
//     },
//     icon: {
//       control: { type: "text" },
//     },
//     loadingIcon: {
//       control: { type: "text" },
//     },
//   },
//   args: { onClick: fn() },
// };

// const container = (val: string) => `
// <div style="margin:5px">
//   ${val}
// </div>
// `;

// export const Default: Story & { args: { content: string } } = {
//   argTypes: {
//     content: {
//       control: { type: "text" },
//     },
//   },
//   args: {
//     type: "primary",
//     content: "Button",
//   },
//   render: (args) => ({
//     components: { IButton },
//     setup() {
//       return { args };
//     },
//     template: container(
//       `<i-button data-testid="story-test-btn" v-bind="args">{{args.content}}</i-button>`
//     ),
//   }),

//   play: async ({ canvasElement, args, step }) => {
//     const canvas = within(canvasElement);
//     await step("click btn", async () => {
//       await userEvent.click(canvas.getByRole("button"));
//     })
//     expect(args.onClick).toHaveBeenCalled();
//     await step("test useThrottle is true", async () => {
//       args.useThrottle = true;
//       await userEvent.tripleClick(canvas.getByTestId("story-test-btn"));
//       expect(args.onClick).toHaveBeenCalledOnce();
//     });
//     await step("test useThrottle is false",async()=> {
//       args.useThrottle = false;
//       await userEvent.tripleClick(canvas.getByTestId("story-test-btn"));
//       expect(args.onClick).toHaveBeenCalledTimes(4)
//     })
//   },
// };

// export default meta;
// // 