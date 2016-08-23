import React from "react";

export default class TodoForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  _handleTextChange = (e) => {
    this.setState({text: e.target.value});
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({text: this.state.text.trim()});
    this.setState({text: ''});
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <input type="text"
               placeholder="What needs to be done?"
               value={this.state.text}
               onChange={this._handleTextChange}/>
      </form>
    );
  }
}
