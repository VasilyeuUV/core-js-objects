/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns shallow copy of an object.
 *
 * @param {Object} obj - an object to copy
 * @return {Object}
 *
 * @example
 *    shallowCopy({a: 2, b: 5}) => {a: 2, b: 5}
 *    shallowCopy({a: 2, b: { a: [1, 2, 3]}}) => {a: 2, b: { a: [1, 2, 3]}}
 *    shallowCopy({}) => {}
 */
function shallowCopy(obj) {
  return { ...obj };
  // return Object.assign({}, obj);
}

/**
 * Merges array of objects into a single object. If there are overlapping keys, the values
 * should be summed.
 *
 * @param {Object[]} objects - The array of objects to merge
 * @return {Object} - The merged object
 *
 * @example
 *    mergeObjects([{a: 1, b: 2}, {b: 3, c: 5}]) => {a: 1, b: 5, c: 5}
 *    mergeObjects([]) => {}
 */
function mergeObjects(objects) {
  // throw new Error('Not implemented');

  const result = {};
  objects.forEach((obj) => {
    const kvpArr = Object.entries(obj);
    kvpArr.forEach(([k, v]) => {
      result[k] = result[k] ? result[k] + v : v;
      // result[k] = (result[k] || 0) + v;
    });
  });
  return result;

  // - Плохо по памяти: большой промежуточный массив.
  // return objects
  //   .flatMap((obj) => Object.entries(obj))
  //   .reduce((acc, [k, v]) => {
  //     acc[k] = (acc[k] || 0) + v;
  //     return acc;
  //   }, {});

  // - Лучший вариант: один аккумулятор.
  // return objects.reduce((acc, obj) => {
  //   Object.entries(obj).forEach(([k, v]) => {
  //     acc[k] = (acc[k] || 0) + v;
  //   });
  //   return acc;
  // }, {});
}

/**
 * Removes a properties from an object.
 *
 * @param {Object} obj - The object from which to remove the property
 * @param {string[]} keys - The keys of the properties to remove
 * @return {Object} - The object with the specified key removed
 *
 * @example
 *    removeProperties({a: 1, b: 2, c: 3}, ['b', 'c']) => {a: 1}
 *    removeProperties({a: 1, b: 2, c: 3}, ['d', 'e']) => {a: 1, b: 2, c: 3}
 *    removeProperties({name: 'John', age: 30, city: 'New York'}, ['age']) => {name: 'John', city: 'New York'}
 *
 */
function removeProperties(obj, keys) {
  // throw new Error('Not implemented');

  const result = { ...obj };
  keys.forEach((k) => delete result[k]);
  return result;

  // - Средние показатели, но объект
  // return Object.fromEntries(
  //   Object.entries(obj).filter(([k]) => !keys.includes(k))
  // );

  // - Медленный по скорости и памяти.
  // return keys.reduce((acc, k) => {
  //   const { [k]: _, ...rest } = acc;
  //   return rest;
  // }, obj);
}

/**
 * Compares two source objects. Returns true if the objects are equal and false otherwise.
 * There are no nested objects.
 *
 * @param {Object} obj1 - The first object to compare
 * @param {Object} obj2 - The second object to compare
 * @return {boolean} - True if the objects are equal, false otherwise
 *
 * @example
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 2}) => true
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 3}) => false
 */
function compareObjects(obj1, obj2) {
  // throw new Error('Not implemented');

  // // - Если ссылки одинаковы, то быстро, иначе - сравнение строк.
  // // Норм для простых и плоских структур.
  // // Проблема: чувствителен к порядку ключей и проблема с типами (NaN, infinity преобразуются в null)
  // return obj1 === obj2 || JSON.stringify(obj1) === JSON.stringify(obj2);

  // - Поверхностное сравнивание по ключам (верхний уровень).
  if (obj1 === obj2) return true;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  return (
    keys1.length === keys2.length &&
    keys1.every((k) => keys2.includes(k) && obj1[k] === obj2[k])
    // keys1.every(
    //   (k) =>
    //     Object.prototype.hasOwnProperty.call(obj2, k) && obj1[k] === obj2[k]
    // )
  );

  // ВАРИАНТЫ:
  // // - structuredClone нормализует и стандартизирует структуры данных
  // // Но проблема с порядком ключей остается.
  // // structuredClone падает, если внутри есть функции или Symbol
  // // Если объекты содержат функции, они заведомо не сериализуемы одинаково
  // if (obj1 === obj2) return true;
  // try {
  //   return (
  //     JSON.stringify(structuredClone(obj1)) ===
  //     JSON.stringify(structuredClone(obj2))
  //   );
  // } catch {
  //   return false;
  // }
}

/**
 * Checks if the source object is empty.
 * Returns true if the object contains no enumerable own properties, false otherwise.
 *
 * @param {Object} obj - The object to check
 * @return {boolean} - True if the object is empty, false otherwise
 *
 * @example
 *    isEmptyObject({}) => true
 *    isEmptyObject({a: 1}) => false
 */
function isEmptyObject(obj) {
  // throw new Error('Not implemented');

  return (
    obj !== null && typeof obj === 'object' && Object.keys(obj).length === 0
  );

  // // - Метод Reflect.ownKeys возвращает абсолютно все ключи: и скрытые, и символы.
  // // Если объект пустой, но в него добавили свойство-символ
  // // (например, obj[Symbol('id')] = 1), то ни Object.keys, ни Object.getOwnPropertyNames его не увидят.
  // return (
  //   obj !== null && typeof obj === 'object' && Reflect.ownKeys(obj).length === 0
  // );
}

/**
 * Makes the source object immutable by preventing any changes to its properties.
 *
 * @param {Object} obj - The source object to make immutable
 * @return {Object} - The immutable version of the object
 *
 * @example
 *    const obj = {a: 1, b: 2};
 *    const immutableObj = makeImmutable(obj);
 *    immutableObj.a = 5;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    delete immutableObj.a;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    immutableObj.newProp = 'new';
 *    console.log(immutableObj) => {a: 1, b: 2}
 */
function makeImmutable(obj) {
  // throw new Error('Not implemented');

  // - Замораживаем свойства:
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Object.isFrozen(obj)) {
    return obj;
  }
  Object.keys(obj).forEach((key) => {
    makeImmutable(obj[key]);
  });
  return Object.freeze(obj);
}

/**
 * Returns a word from letters whose positions are provided as an object.
 *
 * @param {Object} lettersObject - An object where keys are letters and values are arrays of positions
 * @return {string} - The constructed word
 *
 * @example
 *    makeWord({ a: [0, 1], b: [2, 3], c: [4, 5] }) => 'aabbcc'
 *    makeWord({ H:[0], e: [1], l: [2, 3, 8], o: [4, 6], W:[5], r:[7], d:[9]}) => 'HelloWorld'
 */
function makeWord(lettersObject) {
  // throw new Error('Not implemented');

  if (lettersObject === null || typeof lettersObject !== 'object') {
    return '';
  }

  // - Проблемы с производительностью: O(N^2 х M), много промежуточных массивов, лишние вычисления
  if (isEmptyObject(lettersObject)) {
    return '';
  }
  const positions = Object.values(lettersObject).flat();
  const maxIndex = Math.max(...positions);
  const wordArray = Array(maxIndex + 1);
  positions.forEach((i) => {
    const found = Object.entries(lettersObject).find(([, values]) =>
      values.includes(i)
    );
    if (found) {
      const [char] = found;
      wordArray[i] = char;
    }
  });
  return wordArray.join('');

  // // - Оптимизированный предыдущий вариант.
  // const wordArray = [];
  // Object.entries(lettersObject).forEach(([char, indices]) => {
  //   indices.forEach((index) => {
  //     wordArray[index] = char;
  //   });
  // });
  // return wordArray.join('');

  // // - Быстрый по памяти.
  // let maxLength = 0;
  // Object.keys(lettersObject).forEach((char) => {
  //   lettersObject[char].forEach((index) => {
  //     if (index >= maxLength) maxLength = index + 1;
  //   });
  // });
  // if (maxLength === 0) return '';
  // const wordArray = Array(maxLength);
  // Object.keys(lettersObject).forEach((char) => {
  //   lettersObject[char].forEach((index) => {
  //     wordArray[index] = char;
  //   });
  // });
  // return wordArray.join('');

  // // - Короткий и декларативный.
  // return Object.keys(lettersObject)
  //   .reduce((acc, char) => {
  //     lettersObject[char].forEach((index) => {
  //       acc[index] = char;
  //     });
  //     return acc;
  //   }, [])
  //   .join('');
}

/**
 * There is a queue for tickets to a popular movie.
 * The ticket seller sells one ticket at a time strictly in order and give the change.
 * The ticket costs 25. Customers pay with bills of 25, 50, or 100.
 * Initially the seller has no money for change.
 * Return true if the seller can sell tickets, false otherwise
 *
 * @param {number[]} queue - The array representing the bills each customer pays with
 * @return {boolean} - True if the seller can sell tickets to everyone, false otherwise
 *
 * @example
 *    sellTickets([25, 25, 50]) => true
 *    sellTickets([25, 100]) => false (The seller does not have enough money to give change.)
 */
function sellTickets(queue) {
  // throw new Error('Not implemented');

  const ticketCost = 25;
  const cash = [];

  return queue.every((q) => {
    const existingBill = cash.find((bill) => bill.nominal === q);
    if (existingBill) {
      existingBill.count += 1;
    } else {
      cash.push({ nominal: q, count: 1 });
    }

    let change = q - ticketCost;
    if (change === 0) return true;

    const availableBills = cash
      .filter((bill) => bill.count > 0)
      .sort((a, b) => b.nominal - a.nominal);

    availableBills.forEach((bill) => {
      const currentBill = bill;
      if (change >= currentBill.nominal) {
        const neededCount = Math.floor(change / currentBill.nominal);
        const countToTake = Math.min(neededCount, currentBill.count);
        currentBill.count -= countToTake;
        change -= countToTake * currentBill.nominal;
      }
    });

    return change === 0;
  });

  // // - Реализация через Map.
  // const ticketCost = 25;
  // const cash = new Map();

  // return queue.every((bill) => {
  //   cash.set(bill, (cash.get(bill) || 0) + 1);

  //   let changeNeeded = bill - ticketCost;
  //   if (changeNeeded === 0) return true;

  //   const availableNominals = Array.from(cash.keys())
  //     .filter((nominal) => cash.get(nominal) > 0)
  //     .sort((a, b) => b - a);

  //   availableNominals.forEach((nominal) => {
  //     if (changeNeeded >= nominal) {
  //       const availableCount = cash.get(nominal);
  //       const neededCount = Math.floor(changeNeeded / nominal);
  //       const countToTake = Math.min(neededCount, availableCount);
  //       cash.set(nominal, availableCount - countToTake);
  //       changeNeeded -= countToTake * nominal;
  //     }
  //   });
  //   return changeNeeded === 0;
  // });
}

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  // throw new Error('Not implemented');

  // - Несовпадение вызова с примером. Дублирование методов для каждого нового прямоугольника.
  // return {
  //   width,
  //   height,
  //   getArea: () => width * height,
  // };

  // - Функция-конструктор с прототипом (Классический ES5)
  this.width = width;
  this.height = height;

  if (typeof this.getArea !== 'function') {
    Object.getPrototypeOf(this).getArea = function getArea() {
      return this.width * this.height;
    };
  }
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {Object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { height: 10, width: 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  // throw new Error('Not implemented');

  return JSON.stringify(obj);

  // return JSON.stringify(structuredClone(obj));
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {Object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  // throw new Error('Not implemented');

  return Object.create(
    proto,
    Object.getOwnPropertyDescriptors(JSON.parse(json))
  );

  // // - Исторически медленно.
  // return Object.setPrototypeOf(JSON.parse(json), proto);

  // // - Использование встроенного ревайвера
  // // Когда парсинг доходит до корневого объекта (у него ключ — пустая строка)
  // return JSON.parse(json, (key, value) => {
  //   if (key === '') {
  //     return Object.assign(Object.create(proto), value);
  //   }
  //   return value;
  // });

  // // - Наследование + безопасное копирование свойств.
  // return Object.assign(Object.create(proto), JSON.parse(json));
}

/**
 * Sorts the specified array by country name first and city name
 * (if countries are equal) in ascending order.
 *
 * @typedef {{
 * country: string,
 * city: string
 * }} GeoEntity
 *
 * @param {GeoEntity[]} arr
 * @return {GeoEntity[]}
 *
 * @example
 *    [
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Saint Petersburg' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Belarus', city: 'Brest' }
 *    ]
 *                      =>
 *    [
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Russia',  city: 'Saint Petersburg' }
 *    ]
 */
function sortCitiesArray(arr) {
  // throw new Error('Not implemented');

  const compare = (a, b) => a.localeCompare(b);
  return [...arr].sort((a, b) => {
    const countryCompare = compare(a.country, b.country);
    return countryCompare !== 0 ? countryCompare : compare(a.city, b.city);
  });
}

/**
 * Groups elements of the specified array by key.
 * Returns multimap of keys extracted from array elements via keySelector callback
 * and values extracted via valueSelector callback.
 * See: https://en.wikipedia.org/wiki/Multimap
 *
 * @typedef {{
 * country: string,
 * city: string
 * }} GeoEntity
 *
 * @param {GeoEntity[]} array
 * @param {(item: GeoEntity) => string} keySelector
 * @param {(item: GeoEntity) => string} valueSelector
 * @return {Map<string, string[]>}
 *
 * @example
 *   group([
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Russia', city: 'Omsk' },
 *      { country: 'Russia', city: 'Samara' },
 *      { country: 'Belarus', city: 'Grodno' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland', city: 'Lodz' }
 *     ],
 *     item => item.country,
 *     item => item.city
 *   )
 *            =>
 *   Map {
 *    "Belarus" => ["Brest", "Grodno", "Minsk"],
 *    "Russia" => ["Omsk", "Samara"],
 *    "Poland" => ["Lodz"]
 *   }
 */
function group(array, keySelector, valueSelector) {
  // throw new Error('Not implemented');

  const result = new Map();
  array.forEach((item) => {
    const key = keySelector(item);
    const value = valueSelector(item);

    if (!result.has(key)) {
      result.set(key, [value]);
    } else {
      result.get(key).push(value);
    }
  });
  return result;

  // // - Кратко через reduce.
  // return array.reduce((acc, item) => {
  //   const key = keySelector(item);
  //   const value = valueSelector(item);
  //   if (!acc.has(key)) acc.set(key, []);
  //   acc.get(key).push(value);
  //   return acc;
  // }, new Map());
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  element(/* value */) {
    throw new Error('Not implemented');
  },

  id(/* value */) {
    throw new Error('Not implemented');
  },

  class(/* value */) {
    throw new Error('Not implemented');
  },

  attr(/* value */) {
    throw new Error('Not implemented');
  },

  pseudoClass(/* value */) {
    throw new Error('Not implemented');
  },

  pseudoElement(/* value */) {
    throw new Error('Not implemented');
  },

  combine(/* selector1, combinator, selector2 */) {
    throw new Error('Not implemented');
  },
};

module.exports = {
  shallowCopy,
  mergeObjects,
  removeProperties,
  compareObjects,
  isEmptyObject,
  makeImmutable,
  makeWord,
  sellTickets,
  Rectangle,
  getJSON,
  fromJSON,
  group,
  sortCitiesArray,
  cssSelectorBuilder,
};
