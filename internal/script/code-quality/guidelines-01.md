Focus on Readable, Testable, and Type-Safe Code:

Write code that is readable, succinct, and type-safe.
Avoid using TypeScript's any keyword and emphasize type safety.
Maintain Correctness of Handlers:

Do not unnecessarily refactor event handlers if they are already correct.
Refactor JSX for Readability:

Avoid using ternary operators for rendering large blocks of JSX.
Use ternary operators only when it improves readability and keeps the code trivial to understand.
For complex conditions, break out the logic into separate blocks for better readability.
Use Game* Components:

When refactoring, use game-specific components like GameStack, GameText, or other Game* components in place of generic UI elements like <Stack> or <Text> from Mantine.
Use judgment when replacing components to ensure the design remains consistent with the game's UI.
