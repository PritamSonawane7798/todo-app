import React, { Component } from 'react';
import Modal from './Model';
import axios from "axios";
import '../App.css';
class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          viewCompleted: false,
          activeItem: {
            bucket: "",
            todos: "",
            completed: false
          },
          todoList: []
        };
      }
      componentDidMount() {
        this.refreshList();
      }
      refreshList = () => {
        axios
          .get("http://35.188.8.34:8000/api/todos/")
          .then(res => this.setState({ todoList: res.data }))
          .catch(err => console.log(err));
      };
      displayCompleted = status => {
        if (status) {
          return this.setState({ viewCompleted: true });
        }
        return this.setState({ viewCompleted: false });
      };
      renderItems = () => {
        const { viewCompleted } = this.state;
        const newItems = this.state.todoList.filter(
          item => item.completed === viewCompleted
        );
        return newItems.map(item => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span
              className={`todo-title mr-2 todo ${
                this.state.viewCompleted ? "completed-todo" : ""
              }`}
              title={item.todos}
              
        >
            <span>Bucket Name: {item.bucket }</span>
           <span> ToDo: {item.todos}</span>
         
          
            </span>
            <span>
              <button
                onClick={() => this.editItem(item)}
                className="btn btn-secondary mr-2"
              >
                {" "}
                Edit{" "}
              </button>
              <button
                onClick={() => this.handleDelete(item)}
                className="btn btn-danger"
              >
                Delete{" "}
              </button>
            </span>
          </li>
        ));
      };
    toggle = () => {
    this.setState({ modal: !this.state.modal });
    };
    renderTabList = () => {
        return (
          <div className="my-5 tab-list">
            <span
              onClick={() => this.displayCompleted(true)}
              className={this.state.viewCompleted ? "active" : ""}
            >
              complete
            </span>
            <span
              onClick={() => this.displayCompleted(false)}
              className={this.state.viewCompleted ? "" : "active"}
            >
              Incomplete
            </span>
          </div>
        );
      };
    handleSubmit = item => {
        this.toggle();
        console.log(item);
        if (item.id) {
          axios
            .put(`http://35.188.8.34:8000/api/todos/${item.id}/`, item)
            .then(res => this.refreshList());
          return;
        }
        axios
          .post("http://35.188.8.34:8000/api/todos/", item)
          .then(res => this.refreshList());
      };
    handleDelete = item => {
        axios
          .delete(`http://35.188.8.34:8000/api/todos/${item.id}`)
          .then(res => this.refreshList());
      };
    editItem = item => {
        this.setState({ activeItem: item, modal: !this.state.modal });
      };
    createItem = () => {
        const item = { bucket: "", todos: "", completed: false };
        this.setState({ activeItem: item, modal: !this.state.modal });
      };
    render() {
        return (
            <div className="content">
                <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
                <div className="row ">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="card p-3">
                    <div className="">
                        <button onClick={this.createItem} className="btn btn-primary">
                        Add task
                        </button>
                    </div>
                    {this.renderTabList()}
                    <ul className="list-group list-group-flush">
                        {this.renderItems()}
                    </ul>
                    </div>
                </div>
                </div>
                {this.state.modal ? (
                <Modal
                    activeItem={this.state.activeItem}
                    toggle={this.toggle}
                    onSave={this.handleSubmit}
                />
                ) : null}
      
           
            </div>
            
        );
    }
}

export default Todo;