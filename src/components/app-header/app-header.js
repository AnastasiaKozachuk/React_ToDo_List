import React from "react";
import './app-header.css';

const AppHeader = ({toDo, done}) => {

    return (
        <div>
            <h1 className="app-header">Todo List</h1>
            <h2>{toDo} more to do, {done} done</h2>
        </div>
    );

}

export default AppHeader;