import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';

export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = () => <AppWithRedux/>



export const BaseExample = Template.bind({});
BaseExample.args = {}
