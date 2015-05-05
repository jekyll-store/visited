# Jekyll-Store/Visited

[![Build Status](https://travis-ci.org/jekyll-store/visited.svg?branch=master)](https://travis-ci.org/jekyll-store/visited)

Recently Visited plugin for [Jekyll-Store Engine](https://github.com/jekyll-store/engine).

## Actions

### visit

Adds product to the top of the visited list.

Args:

* `name` - Name of the product.

Example:

```javascript
JekyllStoreEngine.Actions.visit({ name: 'bag' });
```

### setVisitedLimit

Set the limit for the number of products in visited list.

Args:

* `limit`

Example:

```javascript
JekyllStoreEngine.Actions.setVisitedLimit({ limit: 5 });
```

## VisitedStore

The products that have been visited recently.

Example output:

```javascript
{
  visited: Immutable.List({
    Immutable.Map({ name: 'Jumper', price: Big(24.30) }),
    Immutable.Map({ name: 'Cardigan', price: Big(21.45) }),
    Immutable.Map({ name: 'Pullover', price: Big(13.90) })
  })
}
```

## Contributing

1. [Fork it](https://github.com/jekyll-store/visited/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
