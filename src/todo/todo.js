import React from "react";
import styles from './todo.scss';

export default class Todo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {id: 0, text: '', done: false};
  }

  componentDidMount() {
    this.setState(this.props.data);
  }

  _toggleDone = ()=> {
    let newState = {
      id: this.state.id,
      text: this.state.text,
      done: !this.state.done
    };
    this.setState(newState);
    this.props.onChange(newState);
  }

  _handleDelete = ()=> {
    this.props.onDelete(this.state.id);
  }

  render() {
    return (
      <li data-id={this.state.id}>
        <input type="checkbox" checked={this.state.done} onChange={this._toggleDone}/>
        <label className={styles.text} data-done={this.state.done}>{this.state.text}</label>&nbsp;
        <label className={styles.delete} onClick={this._handleDelete}>[x]</label>
      </li>
    );
  }
}
