import React, {Component} from 'react';
import autobind from 'class-autobind';

import Search from './search';
import List from './list';
import allRecipes from './recipes';

export default class Home extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      recipes: [],
    };
  }

  // actions
  search(string) {
    this.setState({
      recipes: allRecipes.filter(r => r.name.toUpperCase().includes(string.toUpperCase())),
    });
  }

  // render
  render() {
    return (
      <div>
        <h1>Find a Recipe</h1>

        <Search search={this.search} />
        <List recipes={this.state.recipes} />
      </div>
    );
  }
}
