// class CssSelector {
//   #element;

//   #id;

//   #classes;

//   #attrs;

//   #pseudoClasses;

//   #pseudoElement;

//   constructor(state = {}) {
//     this.#element = state.element || '';
//     this.#id = state.id || '';
//     this.#classes = state.classes || [];
//     this.#attrs = state.attrs || [];
//     this.#pseudoClasses = state.pseudoClasses || [];
//     this.#pseudoElement = state.pseudoElement || '';
//   }

//   static createElement(value) {
//     return new CssSelector().element(value);
//   }

//   static createId(value) {
//     return new CssSelector().id(value);
//   }

//   static createClass(value) {
//     return new CssSelector().class(value);
//   }

//   static createAttr(value) {
//     return new CssSelector().attr(value);
//   }

//   static createPseudoClass(value) {
//     return new CssSelector().pseudoClass(value);
//   }

//   static createPseudoElement(value) {
//     return new CssSelector().pseudoElement(value);
//   }

//   static combine(selector1, combinator, selector2) {
//     const combinedString = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
//     return {
//       stringify() {
//         return combinedString;
//       },
//     };
//   }

//   #next(updatedState) {
//     return new CssSelector({
//       element: this.#element,
//       id: this.#id,
//       classes: this.#classes,
//       attrs: this.#attrs,
//       pseudoClasses: this.#pseudoClasses,
//       pseudoElement: this.#pseudoElement,
//       ...updatedState,
//     });
//   }

//   element(value) {
//     return this.#next({ element: value });
//   }

//   id(value) {
//     return this.#next({ id: `#${value}` });
//   }

//   class(value) {
//     return this.#next({ classes: [...this.#classes, `.${value}`] });
//   }

//   attr(value) {
//     return this.#next({ attrs: [...this.#attrs, `[${value}]`] });
//   }

//   pseudoClass(value) {
//     return this.#next({ pseudoClasses: [...this.#pseudoClasses, `:${value}`] });
//   }

//   pseudoElement(value) {
//     return this.#next({ pseudoElement: `::${value}` });
//   }

//   stringify() {
//     return [
//       this.#element,
//       this.#id,
//       ...this.#classes,
//       ...this.#attrs,
//       ...this.#pseudoClasses,
//       this.#pseudoElement,
//     ].join('');
//   }
// }
