import React, {Component} from "react";
import './app.css';

import AppHeader from '../app-header'
import ItemAddForm from '../item-add-form'
import TodoList from '../todo-list'
import SearchPanel from '../search-panel'
import ItemStatusFilter from '../item-status-filter'

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink coffee'),
            this.createTodoItem('Make awesome app'),
            this.createTodoItem('Have a lunch')
        ],
        term: "",
        filter: "all"
    }

    createTodoItem(label) {
        return {
            label: label,
            important: false,
            id: this.maxId++
        };
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {

            const idx = todoData.findIndex((el) => el.id === id);

            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);

            return {
                todoData: [...before, ...after]
            };
        });
    }

    addItem = (text) => {
        this.setState(({todoData}) => {

            const newItem = this.createTodoItem(text)

            return {
                todoData: [...todoData, newItem]
            };
        });
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        const before = arr.slice(0, idx);
        const after = arr.slice(idx + 1);

        return [...before, newItem, ...after];
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };

        })
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };

        })
    }

    startSearch = (text) => {
        this.setState({term: text});
    }

    search(items, term) {

        if (term.length === 0) {
            return items;
        }

        return items.filter((el) => {
            return el.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    filter(items, filter) {

        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((el) => !el.done);
            case 'done':
                return items.filter((el) => el.done);
            default:
                return items;
        }

    }

    onFilterChange = (filter) => {
        this.setState({filter: filter});
    }

    render() {

        const {todoData, term, filter} = this.state;

        const visibleItems = this.filter(this.search(todoData, term), filter);

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>

                <div className="top-panel d-flex">
                    <SearchPanel startSearch={this.startSearch}/>
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList todos={visibleItems} onDeleted={this.deleteItem} onToggleImportant={this.onToggleImportant}
                          onToggleDone={this.onToggleDone}/>
                <ItemAddForm onAdded={this.addItem}/>
            </div>
        );
    }

}