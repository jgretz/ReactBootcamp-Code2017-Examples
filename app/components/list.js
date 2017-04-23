import React from 'react';
import {connect} from 'react-redux';

const render = ({recipes}) =>
(
  <ul>
    {
      recipes.map(item =>
        (
          <li key={item.key}>
            <a href={item.url} target="_blank">{item.name}</a>
          </li>
        )
      )
    }
  </ul>
);

const mapStateToProps = state =>
({
  recipes: state.recipes,
});

export default connect(mapStateToProps)(render);
