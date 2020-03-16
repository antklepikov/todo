import React, { Component } from "react";
import ReactDom from 'react-dom';
import AppHeader from "./components/app-header";
import SearchPanel from "./components/search-panel";
import TodoList from "./components/todo-list";
import ItemStatusFilter from "./components/item-status-filter";
import ItemAddForm from "./components/item-add-form";
import './index.css';
import {maxBy} from 'lodash';

export default class App extends Component {

    maxId = 100;
    state = {
        todoData: [
            this.createTodoItem('Drink coffee'),
            this.createTodoItem('Cry'),
            this.createTodoItem('Sleep')
        ],
        term: '',
        filter: 'active'
    } ;

    componentDidUpdate() {
        console.log(this.state.todoData)
    }

    createTodoItem  (label, id) {

        let newItemTemplate = {
                label: '',
                important: false,
                done: false,
                id: ''
        };

        if (id) {
            newItemTemplate = {
                label: label,
                important: false,
                done: false,
                id: id
            }
        } else {
            newItemTemplate = {
                label: label,
                important: false,
                done: false,
                id: this.maxId++
            }
        }
        return newItemTemplate;
    }
    deleteItem = (id) => {
        const { todoData } = this.state;
        const idx = todoData.findIndex((el) => el.id === id);

        const newArray = [
            ...todoData.slice(0, idx),
            ...todoData.slice(idx + 1)
        ];

        this.setState({todoData: newArray});
    };

    addItem = (text) => {

        const { todoData } = this.state;
        const maxId = maxBy(todoData, 'id').id + 1;
        const newItem = this.createTodoItem(text, maxId);

        const newArr = [ ...todoData, newItem ];

        this.setState({todoData: newArr});
    };

    toggleProperty (arr, id , propName) {

        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleImportant = (id) => {

        const { todoData } = this.state;

        this.setState({todoData: this.toggleProperty(todoData, id, 'important')});
    };

    onToggleDone = (id) => {

        const { todoData } = this.state;

        this.setState({todoData: this.toggleProperty(todoData, id, 'done')});

    };

    search (items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter( (item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    onSearchPanel = (term) => {
        this.setState({term});
    };

    filter( items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter( (item) => !item.done );
            case 'done':
                return items.filter( (item) => item.done );
            default:
                return items;
        }
    }

    onFilterChange = (filter) => {
      this.setState({filter})
    };

    render() {

        const { addItem, deleteItem } = this;
        const { todoData, term, filter } = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter( (el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return(
            <div className='todo-app'>

                <AppHeader toDo={ todoCount } done={ doneCount }/>

                <div className='top-panel d-flex'>
                    <SearchPanel onSearchPanelFunctionInApp = {this.onSearchPanel}/>
                    <ItemStatusFilter
                        filter = {filter}
                        onFilterChange = {this.onFilterChange}
                    />
                </div>

                <TodoList
                    todos={ visibleItems }
                    onDeleted = { deleteItem }
                    onToggleImportant = { this.onToggleImportant }
                    onToggleDone = { this.onToggleDone }
                />

               <ItemAddForm addItem={addItem} />

            </div>
        );
    }


};

ReactDom.render(<App/>, document.getElementById('root'));