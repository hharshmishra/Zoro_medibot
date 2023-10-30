import React, { Component } from 'react';
import autosize from 'autosize';


class TextArea extends Component {
    componentDidMount() {
        this.textarea.focus();
        autosize(this.textarea);
    }
    
    render() { 
        return (<form onSubmit = {this.props.onSubmit}>
            <input
              className={this.props.classs}
              ref={c => (this.textarea = c)}
              placeholder = "Hey! I'm Zoro, Your Personalised Medical Chatbot. How can I help?"
              value = {this.props.valuee}
              onChange={this.props.handleOnChange}
              rows={1}
            />
            </form>
        );
    }
}
 
export default TextArea;