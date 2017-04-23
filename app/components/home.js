import _ from 'lodash';
import React, {Component} from 'react';
import axios from 'axios';
import autobind from 'class-autobind';

import Search from './search';
import List from './list';

const RECIPE_URL = 'http://food2fork.com/api/search';
const KEY = 'c24fefd7bef74599fcedc27cd6435fac';

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
    axios.get(`https://crossorigin.me/${RECIPE_URL}?key=${KEY}&q=${string}`)
    .then(response => {
      const recipes = response.data.recipes.map((r, index) =>
        ({
          key: index,
          name: r.title,
          url: r.source_url,
        })
      );

      this.setState({
        recipes: _.sortBy(recipes, r => r.name),
      });
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
