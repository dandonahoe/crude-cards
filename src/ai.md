```
# Coding Rules Summary

## Output
- Generate a `.txt` file having the same name as the `.tsx` file.

## Rules

- `[Imports]`: No file in `src/server` should import anything from `src/client`.
- `[ImportAlias]`: All imports should use `@app/` import aliases.
- `[SortImports]`: All imports should be sorted according to their length.
- `[FileRules]`: Each file should export the enum without using the default keyword.
- `[VariableNaming]`: Each enum value should end with a `Type` suffix (e.g., `enum MyEnumType`).
- `[RepoStructure]`: Every directory inside the `src` directory should be in lowercase.
- `[RepoStructure]`: `.tsx` files inside the `src` directory should start with an uppercase letter.
```
