import React from "react";
import styles from "./todo-form.scss";

export default class TodoForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {text: '', valid: true};
  }

  _handleTextChange = (e) => {
    this.setState({text: e.target.value});
  };

  _handleSubmit = (e) => {
    e.preventDefault();
    const text = this.state.text.trim();
    if (validateInput(text)) {
      this.props.onSubmit({text: text});
      this.setState({text: '', valid: true});
    } else {
      /* Update State */
      this.setState({text: text, valid: false})
    }

    function validateInput(input) {
      /* Add code for input validation*/
      return /^[A-Z][^0-9]*$/.test(input);
    }
  };

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <input type="text"
               placeholder="What needs to be done?"
               value={this.state.text}
               onChange={this._handleTextChange}/>&nbsp;
        <span style={{display: this.state.valid?'none':'inline'}}
              className={styles.validationError}>Invalid input</span>
      </form>
    );
  }
}
