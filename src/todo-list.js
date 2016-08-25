import React from 'react';
import Todo from './todo';
import styles from './todo-list.scss';

export default class TodoList extends React.Component {
  render() {
    let todoNodes = this.props.data.map(todo => {
      return (<Todo key={todo.id} data={todo} onChange={this.props.onChange} onDelete={this.props.onDelete}/>);
    });

    return (
      <ul className={styles.list}>{todoNodes}</ul>
    );
  }
};
