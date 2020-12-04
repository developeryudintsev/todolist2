import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import {AddItemForm, PropsType} from './AddItemForm';
import {action} from "@storybook/addon-actions";

export default {
    title: 'Example/AddItemForm Stories',
    component: AddItemForm,
    argTypes: {
        addItem: (description:'callBack который вызовется когда нажмем ADD') => {
        }
    },
} as Meta;

const Template: Story<PropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormBaseExample = Template.bind({});
AddItemFormBaseExample.args = {
    addItem:action('Button inside form clicked')
};
