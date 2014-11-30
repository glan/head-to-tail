'use strict';

var findPath = require('./findPath'),
    start = process.argv[2],
    end = process.argv[3],
    path;

if (!start) {
    console.log('start word not given');
    return;
}

if (!end) {
    console.log('end word not given');
    return;
}

if (start.length != end.length) {
    console.log('words must be the same length');
    return;
}

if (path = findPath(start, end)) {
    console.log(path);
} else {
    console.log('path not found');
}
