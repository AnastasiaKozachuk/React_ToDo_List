import React, {Component} from "react";
import './search-panel.css';

export default class SearchPanel extends Component {

    state = {
        term: ''
    }

    startSearch = (event) => {
        const text = event.target.value;
        this.setState({
            term: text
        });
        this.props.startSearch(text);
    }

    render() {
        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   value={this.state.term}
                   onChange={this.startSearch}/>
        );
    }

}
