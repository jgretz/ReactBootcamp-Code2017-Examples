import _ from 'lodash';
import axios from 'axios';

const RECIPE_URL = 'http://food2fork.com/api/search';
const KEY = 'c24fefd7bef74599fcedc27cd6435fac';

export const SEARCH_FOR_RECIPES = 'SEARCH_FOR_RECIPES';

export const searchForRecipes = string =>
  axios.get(`https://crossorigin.me/${RECIPE_URL}?key=${KEY}&q=${string}`)
  .then(response => {
    const recipes = response.data.recipes.map((r, index) =>
      ({
        key: index,
        name: r.title,
        url: r.source_url,
      })
    );

    return {
      type: SEARCH_FOR_RECIPES,
      payload: _.sortBy(recipes, r => r.name),
    };
  });
