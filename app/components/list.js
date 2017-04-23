import React from 'react';

export default ({recipes = []}) =>
(
  <ul>
    {recipes.map(item => (
      <li key={item.key}>{item.name}</li>
    ))}
  </ul>
);
