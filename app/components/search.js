import React, {Component} from 'react';
import autobind from 'class-autobind';

export default class Search extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      searchText: '',
    };
  }

  // actions
  handleSearchTextChange(e) {
    this.setState({searchText: e.target.value});
  }

  handleSearchClick() {
    this.props.search(this.state.searchText);
    this.setState({searchText: ''});
  }

  // render
  render() {
    return (
      <div>
        <input value={this.state.searchText} onChange={this.handleSearchTextChange} />
        &nbsp;
        <input type="button" value="Search" onClick={this.handleSearchClick} />
      </div>
    );
  }
}
