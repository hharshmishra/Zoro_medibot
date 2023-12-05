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
              placeholder = {this.props.placeholderr}
              value = {this.props.valuee}
              onChange={this.props.handleOnChange}
              rows={1}
              disabled = {this.props.switch}
            />
            </form>
        );
    }
}
 
export default TextArea;