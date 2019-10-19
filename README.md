# Effective Typescript

This is the code sample repo for _Effective TypeScript: 62 Specific Ways to Improve Your TypeScript_. The book is available through:

- [O'Reilly][o]
- [Amazon][a]

and others. Here are the items with associated code samples:

- **Chapter 1: Getting to Know TypeScript**
  - :memo: Item 1: Understand the Relationship Between TypeScript and JavaScript
  - :memo: Item 2: Know Which TypeScript Options You’re Using
  - :memo: Item 3: Understand That Code Generation Is Independent of Types
  - :memo: Item 4: Get Comfortable with Structural Typing
  - :memo: Item 5: Limit Use of the any Type

- **Chapter 2: TypeScript’s Type System**
  - :memo: Item 6: Use Your Editor to Interrogate and Explore the Type System
  - :memo: Item 7: Think of Types as Sets of Values
  - :memo: Item 8: Know How to Tell Whether a Symbol Is in the Type Space or Value Space
  - :memo: Item 9: Prefer Type Declarations to Type Assertions
  - :memo: Item 10: Avoid Object Wrapper Types (String, Number, Boolean, Symbol, BigInt)
  - :memo: Item 11: Recognize the Limits of Excess Property Checking
  - :memo: Item 12: Apply Types to Entire Function Expressions When Possible
  - :memo: Item 13: Know the Differences Between type and interface
  - :memo: Item 14: Use Type Operations and Generics to Avoid Repeating Yourself
  - :memo: Item 15: Use Index Signatures for Dynamic Data
  - :memo: Item 16: Prefer Arrays, Tuples, and ArrayLike to number Index Signatures
  - :memo: Item 17: Use readonly to Avoid Errors Associated with Mutation
  - :memo: Item 18: Use Mapped Types to Keep Values in Sync

- **Chapter 3: Type Inference**
  - :memo: Item 19: Avoid Cluttering Your Code with Inferable Types
  - :memo: Item 20: Use Different Variables for Different Types
  - :memo: Item 21: Understand Type Widening
  - :memo: Item 22: Understand Type Narrowing
  - :memo: Item 23: Create Objects All at Once
  - :memo: Item 24: Be Consistent in Your Use of Aliases
  - :memo: Item 25: Use async Functions Instead of Callbacks for Asynchronous Code
  - :memo: Item 26: Understand How Context Is Used in Type Inference
  - :memo: Item 27: Use Functional Constructs and Libraries to Help Types Flow

- **Chapter 4: Type Design**
  - :memo: Item 28: Prefer Types That Always Represent Valid States
  - :memo: Item 29: Be Liberal in What You Accept and Strict in What You Produce
  - :memo: Item 30: Don’t Repeat Type Information in Documentation
  - :memo: Item 31: Push Null Values to the Perimeter of Your Types
  - :memo: Item 32: Prefer Unions of Interfaces to Interfaces of Unions
  - :memo: Item 33: Prefer More Precise Alternatives to String Types
  - :memo: Item 34: Prefer Incomplete Types to Inaccurate Types
  - :memo: Item 35: Generate Types from APIs and Specs, Not Data
  - :memo: Item 36: Name Types Using the Language of Your Problem Domain
  - :memo: Item 37: Consider “Brands” for Nominal Typing

- **Chapter 5: Working with any**
  - :memo: Item 38: Use the Narrowest Possible Scope for any Types
  - :memo: Item 39: Prefer More Precise Variants of any to Plain any
  - :memo: Item 40: Hide Unsafe Type Assertions in Well-Typed Functions
  - :memo: Item 41: Understand Evolving any
  - :memo: Item 42: Use unknown Instead of any for Values with an Unknown Type
  - :memo: Item 43: Prefer Type-Safe Approaches to Monkey Patching
  - :memo: Item 44: Track Your Type Coverage to Prevent Regressions in Type Safety

- **Chapter 6: Types Declarations and @types**
  - :memo: Item 45: Put TypeScript and @types in devDependencies
  - :memo: Item 46: Understand the Three Versions Involved in Type Declarations
  - :memo: Item 47: Export All Types That Appear in Public APIs
  - :memo: Item 48: Use TSDoc for API Comments
  - :memo: Item 49: Provide a Type for this in Callbacks
  - :memo: Item 50: Prefer Conditional Types to Overloaded Declarations
  - :memo: Item 51: Mirror Types to Sever Dependencies
  - :memo: Item 52: Be Aware of the Pitfalls of Testing Types

- **Chapter 7: Writing and Running Your Code**
  - :memo: Item 53: Prefer ECMAScript Features to TypeScript Features
  - :memo: Item 54: Know How to Iterate Over Objects
  - :memo: Item 55: Understand the DOM hierarchy
  - :memo: Item 56: Don’t Rely on Private to Hide Information
  - :memo: Item 57: Use Source Maps to Debug TypeScript

- **Chapter 8. Migrating to TypeScript**
  - :memo: Item 58: Write Modern JavaScript
  - :memo: Item 59: Use @ts-check and JSDoc to Experiment with TypeScript
  - :memo: Item 60: Use allowJs to Mix TypeScript and JavaScript
  - :memo: Item 61: Convert Module by Module Up Your Dependency Graph
  - :memo: Item 62: Don’t Consider Migration Complete Until You Enable noImplicitAny

[o]: https://www.oreilly.com/library/view/effective-typescript/9781492053736/
[a]: https://www.amazon.com/Effective-TypeScript-Specific-JavaScript-Scales/dp/1492053740
