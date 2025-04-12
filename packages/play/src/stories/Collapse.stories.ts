import type { Meta, StoryObj } from "@storybook/vue3";
 import { ICollapse, ICollapseItem } from "isteyft-ui";
 
 type Story = StoryObj<typeof ICollapse>;
 
 const meta: Meta<typeof ICollapse> = {
   title: "Components/Collapse",
   component: ICollapse,
   subcomponents: { ICollapseItem },
   tags: ["autodocs"],
 };
 
 export const Default: Story = {
  render: (args) => ({
     components: {
       ICollapse,
       ICollapseItem,
     },
     setup() {
       return {
         args,
       };
     },
     template: `
     <I-collapse v-bind="args">
       <I-collapse-item name="a" title="Title a">
         <div>this is content a</div>
       </I-collapse-item>
       <I-collapse-item name="b" title="title b">
         <div>this is content b</div>
       </I-collapse-item>
       <I-collapse-item name="c" title="title c  disable" disabled>
         <div>this is content c</div>
       </I-collapse-item>
     </I-collapse>
     `,
   }),
   args: {
     accordion: true,
     modelValue: ["a"],
   },
 };
 
 export default meta;