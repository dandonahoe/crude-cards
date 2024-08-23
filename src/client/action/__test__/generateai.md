# Code Guidelines Summary

## File: AccountModel
* `AccountModel` must extend `CoreModel`.
* It must have two properties, `accountType` of type `AccountType` and `modelType` of type `ModelType.Account`.

## File: CoreModel
* `CoreModel` must have the following properties: `modelType` of type `ModelType`, `description`, `createdAt`, `updatedAt`,  `createdBy`, `title`, `hash`, `id` of appropriate types and `CreatedBy` which is either of type `UserModel` or null.

## File: CoreDataTypes
* Different core data types are defined which are mostly make use of `Nullable` type.
* Two constants `ActionTypePrefix` and `actionName` are defined.
* Also contains a function `action` that takes a string parameter and calls `createAction<T>` with `actionName` applied to the passed string.

## File: Unit Test
* There is a unit test block that checks if the formatter is working correctly. It mainly tests if `Prompt` class behaves as expected.

Below is a markdown version of the above:

## Code Guidelines Summary

### File: AccountModel
- AccountModel must extend CoreModel.
- It should have the following fields:
  - **accountType**: AccountType
  - **modelType**: ModelType.Account

### File: CoreModel
The CoreModel should have the following fields:
- **modelType**: ModelType
- **description**: string
- **createdAt**: Nullable<string>
- **updatedAt**: Nullable<string>
- **createdBy**: CoreId
- **title**: string
- **hash**: CoreHash
- **id**: CoreId
- **CreatedBy**: UserModel or null

### File: CoreDataTypes
- Defines various core data types.
- Also defines two constants `ActionTypePrefix` and `actionName`.
- Includes function `action` that creates an action from the passed string parameter.

### File: Unit Test
- Contains a unit test block that checks the behavior of formatter.
- Checks that calling `toPrompt()` method on `Prompt` class instance correctly formats the string.