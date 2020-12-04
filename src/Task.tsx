import React, {ChangeEvent, useCallback} from 'react';
import {EditTableSpan} from "./EditTableSpan";
import {FormControlLabel} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import {TaskType} from "./Todolist";

export type PropsTypeTask = {
    task: TaskType,
    todolistId: string
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListId: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
}
export const Task = React.memo((props: PropsTypeTask) => {
    const changeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
    },[])
    const removeTask = useCallback(
        () => props.removeTask(props.task.id, props.todolistId)
        , [
            props.todolistId,
            props.task.id,
            props.removeTask
        ]
    )
    const onChangeHandler = useCallback((e:ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue=e.currentTarget.checked
        props.changeStatus(props.task.id, newIsDoneValue, props.todolistId)},[props.changeStatus,props.task.id, props.todolistId])
    return <div key={props.task.id}>
        <IconButton onClick={removeTask} aria-label="delete">
            <DeleteIcon/>
        </IconButton>
        <FormControlLabel
            onClick={() => {
                props.changeStatus(props.task.id, props.task.isDone, props.todolistId)
            }}
            control={
                <Checkbox checked={props.task.isDone} onChange={onChangeHandler} name="checkedA"/>}
            label=""
        />
        <EditTableSpan title={props.task.title} saveNewTitle={changeTaskTitle}/>
    </div>
})