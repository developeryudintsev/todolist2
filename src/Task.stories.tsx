import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {PropsTypeTask, Task} from "./Task";

export default {
    title: 'Example/Task',
    component: Task,
} as Meta;

const removeTaskCallBack = action('removeTaskCallBack was clicked');
const changeStatusCallBack = action('changeStatusCallBack was clicked');
const changeTaskTitleCallBack = action('changeTaskTitleCallBack was clicked');
const baseArgs={
    removeTask: removeTaskCallBack,
    changeTaskTitle: changeTaskTitleCallBack,
    changeStatus: changeStatusCallBack
}
const Template: Story<PropsTypeTask> = (args) => <Task {...args}/>

export const isNotCompletedTask = Template.bind({});
isNotCompletedTask.args = {
    task: {id: '2', isDone: false, title: 'css'},
    todolistId: 'todolistID',
    ...baseArgs
}

export const isCompletedTask = Template.bind({});
isCompletedTask.args = {
    task: {id: '2', isDone: true, title: 'JS'},
    todolistId: 'todolistID',
    ...baseArgs
}