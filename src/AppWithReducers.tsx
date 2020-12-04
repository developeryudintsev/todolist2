import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {Button, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Menu} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import {
    AddTodolistAC,
    ChangeTodolistAC,
    FilterTodolistAC,
    RemoveTodolistAC,
    TodolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}
let todoListId1 = v1();
let todoListId2 = v1();
function AppWithReducers() {
     let[todolists,dispatchTodolists]=useReducer(TodolistReducer,[
        {id: todoListId1, title: 'What to Learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    let[tasks,dispatchTasks]=useReducer(tasksReducer,{
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "SaSS", isDone: true},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    })

    function removeTask(id: string, todoListId: string) {
        // let todoListTasks = tasks[todoListId];
        // tasks[todoListId] = todoListTasks.filter(f => f.id !== id);
        // setTasks({...tasks});
        dispatchTasks(removeTaskAC(id, todoListId));
    }

    const addTask = (title: string, todoListId: string) => {
        // let newTask = {id: v1(), title: title, isDone: false};
        // let todoListTasks = tasks[todoListId];
        // tasks[todoListId] = [newTask, ...todoListTasks]
        // setTasks({...tasks});
        dispatchTasks(addTaskAC(title, todoListId));
    }

    const changeTaskTitle = (taskID: string, newTitle: string, todoListId: string) => {
        // let todoListTasks = tasks[todoListId];
        // let task = todoListTasks.find(f => f.id === taskID);
        // if (task) {
        //     task.title = newTitle;
        //     console.log(todoListId)//
        //     setTasks({...tasks})
        // }
        dispatchTasks(changeTaskTitleAC(taskID, todoListId,newTitle));
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        // let todoListTasks = tasks[todoListId];
        // let task = todoListTasks.find(f => f.id === id);
        // if (task) {
        //     task.isDone = !isDone;
        //     setTasks({...tasks})
        // }
        dispatchTasks(changeTaskStatusAC(id,todoListId,isDone));
    }


    const changeTodolistTitle = (todoListId: string, newTitle: string) => {
        // let todoList = todolists.find(f => f.id === todoListId);
        // if (todoList) {
        //     todoList.title = newTitle;
        //     setTodolists([...todolists])
        // }
        dispatchTodolists(ChangeTodolistAC(todoListId, newTitle));
    }

    function removeTodolist(todoListId: string) {
        // delete tasks[todoListId];
        // setTasks({...tasks})
        // setTodolists(todolists.filter(f => f.id !== todoListId))
        dispatchTodolists(RemoveTodolistAC(todoListId));
        dispatchTasks(RemoveTodolistAC(todoListId));
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        // let todoList = todolists.find(f => f.id === todoListId);
        // if (todoList) {
        //     todoList.filter = value;
        //     setTodolists([...todolists])
        // }
        dispatchTodolists(FilterTodolistAC(todoListId,value));
    }

    function addTodoList(title: string) {
       let action=AddTodolistAC(title)
        dispatchTodolists(action);
        dispatchTasks(action);

    }
debugger
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <p></p>
                <p></p>
                <Grid container spacing={3}>{
                    todolists.map(m => {
                        debugger
                        let tasksForTodolist = tasks[m.id];
                        if (m.filter === "active") {
                            tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
                        }
                        if (m.filter === "completed") {
                            tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding: '20px'}} elevation={5}>
                                    <Todolist
                                        key={m.id}
                                        id={m.id}
                                        title={m.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={m.filter}
                                        deleteTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
