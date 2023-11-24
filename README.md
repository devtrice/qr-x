# Development

```
yarn dev; // Will start the nextjs server
yarn build; // Currently need to run manually after each of core and react to updated
```

## packages/core

This package is the base of our lib. We refactor most used logic in this package like getMatrix() and our cell shapes.

## packages/react

This package server as a react interface

# Problems to solve

- Not able to use svg paths as it doesn't have x & y coordinate prop. So maybe we need to manually build shapes using rect or other svg elements
