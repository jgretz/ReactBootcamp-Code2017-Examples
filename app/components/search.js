import React, {Component} from 'react';
import autobind from 'class-autobind';
import {connect} from 'react-redux';

import {updateSearchText, searchForRecipes} from '../actions';

class Search extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  // actions
  handleSearchClick() {
    this.props.searchForRecipes(this.props.searchText);
  }

  // render
  render() {
    return (
      <div className="search">
        <input value={this.props.searchText} onChange={this.props.updateSearchText} />
        &nbsp;
        <input type="button" value="Search" onClick={this.handleSearchClick} />
      </div>
    );
  }
}

const mapStateToProps = state =>
({
  searchText: state.searchText,
});

export default connect(mapStateToProps, {updateSearchText, searchForRecipes})(Search);
