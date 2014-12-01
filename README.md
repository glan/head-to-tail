# Head to Tail

Attempts to find the shortest path of valid words between 2 given words of the same length using single letter mutations.

## Example

`head` ⇒ `tail`

```bash
node main.js head tail
```

### Result

```js
[ 'head', 'heal', 'teal', 'teil', 'tail' ]
```

## Implementation

Builds a word tree with the first word as the root node. Each level of the tree represents a single letter mutation from the parent node. Words are only used once and are removed from the word pool once they are placed into the tree. As the tree is constructed we perform a breadth-first search for the end word. This is done by removing nodes from a queue which is pushed to as the tree is constructed.

The valid word dictionary is sourced from `/usr/share/dict/words`.
