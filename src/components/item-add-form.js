import React, {Component} from "react";

export default class ItemAddForm extends Component{

    state = {
        label: ''
    };

    onLableChange = (e) => {
      this.setState( { label: e.target.value })
    };

    onSubmit = (e) => {
        e.preventDefault();
        //this.props.addItem(this.state.label);
        this.setState({label: ''});
    };

    render() {

        return(
            <form className='d-flex' onSubmit={ this.onSubmit }>

                <input onChange={ this.onLableChange }
                       className='form-control'
                       placeholder=" add "
                       value={this.state.label}
                />
                <button className="btn btn-outline-secondary">Add</button>
            </form>
        )
    }

}