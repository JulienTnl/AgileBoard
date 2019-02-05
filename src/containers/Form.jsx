import React, { Component } from "react";

/* Import Components */
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Select from "../components/Select";
import Button from "../components/Button";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTicket: {
        title: "",
        currentState: "",
        description: ""
      },

      currentStateOptions: ["High", "Medium", "Low"],
    };
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleTitle(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newTicket: {
          ...prevState.newTicket,
          title: value
        }
      }),
      () => console.log(this.state.newTicket)
    );
  }

  handleInput(e) {
    let value = e.target.value;
    let title = e.target.title;
    this.setState(
      prevState => ({
        newTicket: {
          ...prevState.newTicket,
          [title]: value
        }
      }),
      () => console.log(this.state.newTicket)
    );
  }

  handleTextArea(e) {
    console.log("Inside handleTextArea");
    let value = e.target.value;
    this.setState(
      prevState => ({
        newTicket: {
          ...prevState.newTicket,
          description: value
        }
      }),
      () => console.log(this.state.newTicket)
    );
  }

  

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newTicket;

    fetch("http://example.com", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log("Successful" + data);
      });
    });
  }

  

  render() {
    const formu = {
        'display': 'inline-block',
        'verticalAlign': 'top',
        'marginRight': '5px',
        'marginBottom': '15px',
        'paddingLeft': '5px',
        'paddingTop': '10px',
        'width': '280px',
        'text-align': 'center',
        'backgroundColor': '#FE9438',
        'border-radius' : '1em',
    };
    return (
      <form style={formu} className="container-fluid" onSubmit={this.handleFormSubmit}>
        <h4>Create new ticket</h4>
        <Input
          inputType={"text"}
          value={this.state.newTicket.title}
          placeholder={"Enter the title"}
          handleChange={this.handleInput}
        />{" "}<br />
        <Select
          name={"currentState"}
          options={this.state.currentStateOptions}
          value={this.state.newTicket.currentState}
          placeholder={"Select Current State"}
          handleChange={this.handleInput}
        />{" "}<br />
        <TextArea
          rows={10}
          value={this.state.newTicket.description}
          name={"currentPetInfo"}
          handleChange={this.handleTextArea}
          placeholder={"About the mission"}
        /><br />
        <Button
          action={this.handleFormSubmit}
          type={"primary"}
          title={"Submit"}
          style={buttonStyle}
        />{" "}<br />
      </form>
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default Form;