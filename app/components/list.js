import React from 'react';

export default ({recipes = []}) =>
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
