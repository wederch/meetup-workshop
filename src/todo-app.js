import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './todo-list/todo-list';
import TodoForm from './todo-form/todo-form';
import styles from './todo-app.scss';

export default class TodoApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: []};
    this.loadTodos = this.loadTodos.bind(this);
  }

  static init(id, props) {
    return ReactDOM.render(<TodoApp {...props} />, document.getElementById(id));
  }

  loadTodos() {
    fetch(this.props.url)
      .then(res => res.json())
      .then(json => this.setState({data: json}));
  }

  _createTodo = (todo) => {
    fetch(this.props.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
  }

  _updateTodo = (todo) => {
    fetch(this.props.url + todo.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
  }

  _deleteTodo = (id) => {
    fetch(this.props.url + id, {method: 'DELETE'});
  }

  componentDidMount() {
    this.loadTodos();
    setInterval(this.loadTodos, this.props.pollInterval);
  }

  render() {
    return (
      <div id='todoBox'>
        <h1>Todos</h1>
        <TodoForm onSubmit={this._createTodo}/>
        <TodoList data={this.state.data} onChange={this._updateTodo} onDelete={this._deleteTodo}/>

      </div>
    );
  }
}
