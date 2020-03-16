import React, {Component} from "react";
import './search-panel.css'


export default class SearchPanel extends Component {

    state = {
      term: ''
    };

    onSearchChange = (e) => {
        const term = e.target.value;
        this.setState({term} );
        this.props.onSearchPanelFunctionInApp(term);

    };

    render() {
        const searchStyle = {
            fontSize: '20px'
        };
        return (

            <input onChange={this.onSearchChange}
                   className='form-control search-input'
                   style ={searchStyle}
                   placeholder="search"
                   value={this.state.term}
            />
        );
    }

}
