[<img src="/cover.jpg" width="286" title="Second Edition Cover Image" align="right">][a]

# Effective TypeScript

This is the code sample repo for the _Effective TypeScript: 83 Specific Ways to Improve Your TypeScript_ (O'Reilly, May 2024). The book is available through:

- [Amazon][a]
- [O'Reilly][o]
- [DRM-Free eBook][ebook]

and others. You can get the latest updates on the book at [effectivetypescript.com](https://effectivetypescript.com).

Still on the first edition? Check out the [`1st-edition` branch][1e].

## Code Samples

Below you'll find a complete table of contents. Each item links to a page with its "Things to Remember" (a short summary of the item) and a listing of all its code samples. The code samples are accompanied by links to the [TypeScript playground][play]. They should produce the expected errors (and no others) and expected types.

Unless otherwise noted in a comment at the top of the code sample, the samples are run with TypeScript's `strict` setting. These were produced and checked using [literate-ts][] and TypeScript 5.4.5.

- **Chapter 1: Getting to Know TypeScript**
  - [:memo: Item 1](/samples/ch-intro/ts-vs-js.md): Understand the Relationship Between TypeScript and JavaScript
  - [:memo: Item 2](/samples/ch-intro/which-ts.md): Know Which TypeScript Options You're Using
  - [:memo: Item 3](/samples/ch-intro/independent.md): Understand That Code Generation Is Independent of Types
  - [:memo: Item 4](/samples/ch-intro/structural.md): Get Comfortable with Structural Typing
  - [:memo: Item 5](/samples/ch-intro/any.md): Limit Use of the `any` Type

- **Chapter 2: TypeScript's Type System**
  - [:memo: Item 6](/samples/ch-types/editor.md): Use Your Editor to Interrogate and Explore the Type System
  - [:memo: Item 7](/samples/ch-types/types-as-sets.md): Think of Types as Sets of Values
  - [:memo: Item 8](/samples/ch-types/type-value-space.md): Know How to Tell Whether a Symbol Is in the Type Space or Value Space
  - [:memo: Item 9](/samples/ch-types/prefer-declarations-to-assertions.md): Prefer Type Annotations to Type Assertions
  - [:memo: Item 10](/samples/ch-types/avoid-object-wrapper-types.md): Avoid Object Wrapper Types (String, Number, Boolean, Symbol, BigInt)
  - [:memo: Item 11](/samples/ch-types/excess-property-checking.md): Distinguish Excess Property Checking from Type Checking
  - [:memo: Item 12](/samples/ch-types/type-entire-functions.md): Apply Types to Entire Function Expressions When Possible
  - [:memo: Item 13](/samples/ch-types/type-vs-interface.md): Know the Differences Between `type` and `interface`
  - [:memo: Item 14](/samples/ch-types/readonly.md): Use `readonly` to Avoid Errors Associated with Mutation
  - [:memo: Item 15](/samples/ch-types/map-between-types.md): Use Type Operations and Generic Types to Avoid Repeating Yourself
  - [:memo: Item 16](/samples/ch-types/index-for-dynamic.md): Prefer More Precise Alternatives to Index Signatures
  - [:memo: Item 17](/samples/ch-types/number-index.md): Avoid Numeric Index Signatures

- **Chapter 3: Type Inference and Control Flow Analysis**
  - [:memo: Item 18](/samples/ch-inference/avoid-inferable.md): Avoid Cluttering Your Code with Inferable Types
  - [:memo: Item 19](/samples/ch-inference/one-var-one-type.md): Use Different Variables for Different Types
  - [:memo: Item 20](/samples/ch-inference/widening.md): Understand How a Variable Gets Its Type
  - [:memo: Item 21](/samples/ch-inference/all-at-once.md): Create Objects All at Once
  - [:memo: Item 22](/samples/ch-inference/narrowing.md): Understand Type Narrowing
  - [:memo: Item 23](/samples/ch-inference/avoid-aliasing.md): Be Consistent in Your Use of Aliases
  - [:memo: Item 24](/samples/ch-inference/context-inference.md): Understand How Context Is Used in Type Inference
  - [:memo: Item 25](/samples/ch-inference/evolving-any.md): Understand Evolving Types
  - [:memo: Item 26](/samples/ch-inference/functional-libraries.md): Use Functional Constructs and Libraries to Help Types Flow
  - [:memo: Item 27](/samples/ch-inference/use-async-await.md): Use async Functions Instead of Callbacks to Improve Type Flow
  - [:memo: Item 28](/samples/ch-inference/inference-sites.md): Use Classes and Currying to Create New Inference Sites

- **Chapter 4: Type Design**
  - [:memo: Item 29](/samples/ch-design/valid-states.md): Prefer Types That Always Represent Valid States
  - [:memo: Item 30](/samples/ch-design/loose-accept-strict-produce.md): Be Liberal in What You Accept and Strict in What You Produce
  - [:memo: Item 31](/samples/ch-design/jsdoc-repeat.md): Don’t Repeat Type Information in Documentation
  - [:memo: Item 32](/samples/ch-design/null-in-type.md): Avoid Including `null` or `undefined` in Type Aliases
  - [:memo: Item 33](/samples/ch-design/null-values-to-perimeter.md): Push Null Values to the Perimeter of Your Types
  - [:memo: Item 34](/samples/ch-design/union-of-interfaces.md): Prefer Unions of Interfaces to Interfaces with Unions
  - [:memo: Item 35](/samples/ch-design/avoid-strings.md): Prefer More Precise Alternatives to String Types
  - [:memo: Item 36](/samples/ch-design/in-domain-null.md): Use a Distinct Type for Special Values
  - [:memo: Item 37](/samples/ch-design/avoid-optional.md): Limit the Use of Optional Properties
  - [:memo: Item 38](/samples/ch-design/same-type-params.md): Avoid Repeated Parameters of the Same Type
  - [:memo: Item 39](/samples/ch-design/unify.md): Prefer Unifying Types to Modeling Differences
  - [:memo: Item 40](/samples/ch-design/incomplete-over-inaccurate.md): Prefer Imprecise Types to Inaccurate Types
  - [:memo: Item 41](/samples/ch-design/language-of-domain.md): Name Types Using the Language of Your Problem Domain
  - [:memo: Item 42](/samples/ch-design/consider-codegen.md): Avoid Types Based on Anecdotal Data

- **Chapter 5: Unsoundness and the any Type**
  - [:memo: Item 43](/samples/ch-any/narrowest-any.md): Use the Narrowest Possible Scope for `any` Types
  - [:memo: Item 44](/samples/ch-any/specific-any.md): Prefer More Precise Variants of `any` to Plain `any`
  - [:memo: Item 45](/samples/ch-any/hide-unsafe-casts.md): Hide Unsafe Type Assertions in Well-Typed Functions
  - [:memo: Item 46](/samples/ch-any/never-unknown.md): Use unknown Instead of `any` for Values with an Unknown Type
  - [:memo: Item 47](/samples/ch-any/type-safe-monkey.md): Prefer Type-Safe Approaches to Monkey Patching
  - [:memo: Item 48](/samples/ch-any/unsoundness.md): Avoid Soundness Traps
  - [:memo: Item 49](/samples/ch-any/type-percentage.md): Track Your Type Coverage to Prevent Regressions in Type Safety

- **Chapter 6: Generics and Type-Level Programming**
  - [:memo: Item 50](/samples/ch-generics/functions-on-types.md): Think of Generics as Functions Between Types
  - [:memo: Item 51](/samples/ch-generics/golden-rule.md): Avoid Unnecessary Type Parameters
  - [:memo: Item 52](/samples/ch-generics/conditional-overload.md): Prefer Conditional Types to Overload Signatures
  - [:memo: Item 53](/samples/ch-generics/control-distribution.md): Know How to Control the Distribution of Unions over Conditional Types
  - [:memo: Item 54](/samples/ch-generics/template-dsl.md): Use Template Literal Types to Model DSLs and Relationships Between Strings
  - [:memo: Item 55](/samples/ch-generics/test-your-types.md): Write Tests for Your Types
  - [:memo: Item 56](/samples/ch-generics/type-display.md): Pay Attention to How Types Display
  - [:memo: Item 57](/samples/ch-generics/tail-recursion.md): Prefer Tail-Recursive Generic Types
  - [:memo: Item 58](/samples/ch-generics/codegen-alt.md): Consider Codegen as an Alternative to Complex Types

- **Chapter 7: TypeScript Recipes**
  - [:memo: Item 59](/samples/ch-recipes/exhaustiveness.md): Use `never` Types to Perform Exhaustiveness Checking
  - [:memo: Item 60](/samples/ch-recipes/iterate-objects.md): Know How to Iterate Over Objects
  - [:memo: Item 61](/samples/ch-recipes/values-in-sync.md): Use `Record` Types to Keep Values in Sync
  - [:memo: Item 62](/samples/ch-recipes/conditional-varargs.md): Use Rest Parameters and Tuple Types to Model Variadic Functions
  - [:memo: Item 63](/samples/ch-recipes/optional-never.md): Use Optional `never` Properties to Model Exclusive Or
  - [:memo: Item 64](/samples/ch-recipes/brands.md): Consider Brands for Nominal Typing

- **Chapter 8: Type Declarations and @types**
  - [:memo: Item 65](/samples/ch-declarations/dev-dependencies.md): Put TypeScript and `@types` in `devDependencies`
  - [:memo: Item 66](/samples/ch-declarations/three-versions.md): Understand the Three Versions Involved in Type Declarations
  - [:memo: Item 67](/samples/ch-declarations/export-your-types.md): Export All Types That Appear in Public APIs
  - [:memo: Item 68](/samples/ch-declarations/use-tsdoc.md): Use TSDoc for API Comments
  - [:memo: Item 69](/samples/ch-declarations/this-in-callbacks.md): Provide a Type for `this` in Callbacks if It's Part of Their API
  - [:memo: Item 70](/samples/ch-declarations/mirror-types-for-deps.md): Mirror Types to Sever Dependencies
  - [:memo: Item 71](/samples/ch-declarations/augment-improve.md): Use Module Augmentation to Improve Types

- **Chapter 9: Writing and Running Your Code**
  - [:memo: Item 72](/samples/ch-write-run/avoid-non-ecma.md): Prefer ECMAScript Features to TypeScript Features
  - [:memo: Item 73](/samples/ch-write-run/source-maps-debug.md): Use Source Maps to Debug TypeScript
  - [:memo: Item 74](/samples/ch-write-run/runtime-types.md): Know How to Reconstruct Types at Runtime
  - [:memo: Item 75](/samples/ch-write-run/understand-the-dom.md): Understand the DOM Hierarchy
  - [:memo: Item 76](/samples/ch-write-run/model-env.md): Create an Accurate Model of Your Environment
  - [:memo: Item 77](/samples/ch-write-run/types-or-tests.md): Understand the Relationship Between Type Checking and Unit Testing
  - [:memo: Item 78](/samples/ch-write-run/performance.md): Pay Attention to Compiler Performance

- **Chapter 10: Modernization and Migration**
  - [:memo: Item 79](/samples/ch-migrate/write-modern-js.md): Write Modern JavaScript
  - [:memo: Item 80](/samples/ch-migrate/jsdoc-tscheck.md): Use `@ts-check` and JSDoc to Experiment with TypeScript
  - [:memo: Item 81](/samples/ch-migrate/allowjs.md): Use `allowJs` to Mix TypeScript and JavaScript
  - [:memo: Item 82](/samples/ch-migrate/convert-up-the-graph.md): Convert Module by Module Up Your Dependency Graph
  - [:memo: Item 83](/samples/ch-migrate/start-loose.md): Don't Consider Migration Complete Until You Enable `noImplicitAny`

[o]: https://www.oreilly.com/library/view/effective-typescript/9781098155056/
[a]: https://amzn.to/3UjPrsK
[ebook]: https://www.ebooks.com/search/?term=9781098155063&affid=OMI5374258
[literate-ts]: https://github.com/danvk/literate-ts
[play]: https://www.typescriptlang.org/play/
[1e]: https://github.com/danvk/effective-typescript/tree/1st-edition
