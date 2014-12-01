'use strict';

/**
 * Gets a list of valid dictionary words of a given length.
 * @param wordLength {number}
 * @return {array} list of words.
 */
function getDictionary(wordLength) {
    // load words (copied from /usr/share/dict/words)
    var words = require('./words');

    // filter word list so it only contains words of the required length
    return words.filter(function (word) {
        return (word.length === wordLength);
    });
}

/**
 * Traverses the word tree from the given node to the root.
 * Returns the word path from root outward to the node.
 * @param wordTree {object} a map representing the word tree.
 * The key is the word and the value is the parent word.
 * @param endWord {string} the node to start working from.
 * @return {array} the path from root to node.
 */
function replayPath(wordTree, endWord) {
    var out = [];
    // Trace path
    while (endWord != wordTree[endWord]) {
        // add to output
        out.unshift(endWord);
        // locate prev word
        endWord = wordTree[endWord];
    }
    out.unshift(endWord);
    return out;
}

/**
 * Find the path between 2 words.
 * @param startWord {string} the word to start from.
 * @param endWord {string} the word to end on.
 * @return {array} sequence of word transforms.
 */
function findPath(startWord, endWord) {
    var wordQueue = [],
        wordTree = {}, // currentWord: parentWord
        wordPool = getDictionary(startWord.length);
    try {
        while (startWord) {
            console.log('node count: ' + Object.keys(wordTree).length + ', queue size: ' + wordQueue.length);
            // scan word list for matches and remove them from the pool.
            wordPool = wordPool.filter(function (word) {
                var i, reg;
                // for each letter
                for (i = 0; i < startWord.length; i++) {
                    // create matching expression
                    reg = new RegExp('^' + startWord.slice(0, i) + '[a-z]{1}' + startWord.slice(i + 1) + '$');
                    if (reg.test(word)) {
                        // if word matches, add it to the wordTree
                        wordTree[word] = startWord;
                        if (word === endWord) {
                            // if the end word is found, then exit (by throwing)
                            throw wordTree;
                        } else {
                            // push matching word onto the queue
                            wordQueue.push(word);
                        }
                        // remove word from wordPool
                        return false;
                    }
                }
                return true;
            });
            // take word from front of the queue
            startWord = wordQueue.shift();
        }
    } catch (err) {
        if (err === wordTree) {
            // catch path found, then return path
            return replayPath(wordTree, endWord);
        } else {
            // propagate any other errors
            throw err;
        }
    }
}

module.exports = findPath;
