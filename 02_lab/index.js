const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');
const objUtils = require('./objUtils');
// formatting: first test case will pass, second will fail.
// arrayUtils test cases
// mean: returns 2, error
try {
  console.log(arrayUtils.mean([1, 2, 3]));
} catch (e) {
  console.log(e);
}
try {
  console.log(arrayUtils.mean([1, 2, 3], [1, 2, 3]));
} catch (e) {
  console.log(e);
}

// medianSquared: return 4, error
try {
  console.log(arrayUtils.medianSquared([4, 1, 2]));
} catch (e) {
  console.log(e);
}
try {
  console.log(arrayUtils.medianSquared(['guitar', 1, 3, 'apple']));
} catch (e) {
  console.log(e);
}

// maxElement: returns { '13' : 4 }, error
try {
  console.log(arrayUtils.maxElement([-1, 5, 3, 5, 9]));
} catch (e) {
  console.log(e);
}
try {
  console.log(arrayUtils.maxElement([1, 2, 3], [1, 2, 3]));
} catch (e) {
  console.log(e);
}

// fill: returns [0, 1, 2, 3, 4, 5], error
try {
  console.log(arrayUtils.fill(6));
} catch (e) {
  console.log(e);
}
try {
  console.log(arrayUtils.fill(0, 5));
} catch (e) {
  console.log(e);
}

//countrepeating:
try {
  console.log(
    arrayUtils.countRepeating([
      7,
      '7',
      13,
      true,
      true,
      true,
      'Hello',
      'Hello',
      'hello',
    ])
  );
} catch (e) {
  console.log(e);
}

try {
  console.log(arrayUtils.countRepeating());
} catch (e) {
  console.log(e);
}

// isequal returns true, false
try {
  console.log(
    arrayUtils.isEqual(['Z', 'R', 'B', 'C', 'A'], ['R', 'B', 'C', 'A', 'Z'])
  );
} catch (e) {
  console.log(e);
}

try {
  console.log(arrayUtils.isEqual());
} catch (e) {
  console.log(e);
}

// STRINGUTILS TEST CASES

try {
  console.log(stringUtils.camelCase('my function rocks'));
} catch (e) {
  console.log(e);
}
try {
  console.log(stringUtils.camelCase(123));
} catch (e) {
  console.log(e);
}

try {
  console.log(stringUtils.replaceChar('Oobleck looks like dog'));
} catch (e) {
  console.log(e);
}

try {
  console.log(stringUtils.replaceChar(123));
} catch (e) {
  console.log(e);
}

try {
  console.log(stringUtils.mashUp('Eric', 'Song'));
} catch (e) {
  console.log(e);
}
try {
  console.log(stringUtils.mashUp('Eric', ''));
} catch (e) {
  console.log(e);
}

const first = { x: 2, y: 3 };
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };

try {
  console.log(objUtils.makeArrays([first, second, third]));
} catch (e) {
  console.log(e);
}
try {
  console.log(objUtils.makeArrays(first));
} catch (e) {
  console.log(e);
}

const fourth = {
  a: { sA: 'Hello', sB: 'There', sC: 'Class' },
  b: 7,
  c: true,
  d: 'Test',
};
const fifth = {
  c: true,
  b: 7,
  d: 'Test',
  a: { sB: 'There', sC: 'Class', sA: 'Hello' },
};

try {
  console.log(objUtils.isDeepEqual(fourth, fifth));
} catch (e) {
  console.log(e);
}

try {
  console.log(
    objUtils.isDeepEqual(
      {
        a: { aa: { aaa: { aaaa: 1, bbbb: 2 } } },
        b: { bb: { bbb: 3 }, cc: { ddd: { dddd: 4 } } },
      },
      {
        b: { bb: { bbb: 3 }, cc: { ddd: { dddd: 4 } } },
        a: { aa: { aaa: { aaaa: 1, bbbb: 2 } } },
      }
    )
  );
} catch (e) {
  console.log(e);
}

try {
  console.log(objUtils.computeObject({ a: 3, b: 6, c: 5 }, (n) => n * 2));
} catch (e) {
  console.log(e);
}

try {
  console.log(objUtils.computeObject({}, (n) => n * 2));
} catch (e) {
  console.log(e);
}
