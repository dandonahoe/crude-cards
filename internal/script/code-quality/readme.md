# Code Quality Guidelines

# GENAI IGNORE THIS PART

Create a super good code directory parser
Multiple Passes, Iterative like Radioisity, Diminishing retruns

Pass 1: Analysis
Dump Entire Codebase into Markdown file.

Reviewer

Repeat, Filter (filter out ones that look good) or End
Keep filtering reults (files) down until done.

For each pass, determine which of the filters to appply in which order.
May only want to apply certain ones to hone down

Every pass:
 Auto Tag Everything in Edited Code
    Repeat Code Quality (Option to repeat step)
 pass to ask AI where more documentation is needed
    Repeat Code Quality (Option to repeat step)
 pass add documentation to areas
    Review updated documentation, ensure correct
pass
    At this point, we've given a lot more context for gen at to make more
    important changes
pass Apply code quality rules
    Review / Finalize Subset of "Good" Files
    Repeat Code Quality (Option to repeat step)

Add additional TSDocs to all places it applies, and add comments to all non-trivial lines of code, ie "const a = 1;" is trivial



Review - fill in necessary

Index

Put code blocks in place, review
You should be able to put github tags into your code in blocks, then have them auto applied


# GENAI START UNIGNORING FROM HERE on

TypeScript, Node.js, NestJS, Jest

- Always include `public`, `private` or `protected` visibility modifier for class properties and methods.
- Break functions down into smalles possible units, suitable for testing
- In the header of the file, include a comment block with the following information:
  - Description
  - Usage
- Use type hinting for all function arguments and return values
- Include tsdoc comments for all functions and classes, omit parameter type information, just `@param name - description`
- Comment all code
- Include copious logging of appropriate levels and information
  - error - for errors
  - warn - for warnings
  - info - for information
  - debug - Include debug information and shallow ids
  - silly - Include debug information and full data
- Use Arrow Functions when possible, note decorated functions cannot be arrow functions
- Align semicolons on objects
- Sort imports by line length
- 4 spaces for indentation
- Omit useless parenthesis
- Omit useless braces
- Use thorough defensive error checking
- Validate all inputs
- Rethrow any caught errors so the central Exception handler can treat them unifiormly



- Tacti -
Upload a codebase MD file
"Given the MD file, list ALL files with any instance of a Box component, and print out the Box + props and remove the children. I want to see all boxes in a common spot."


im refactoring the fronend to make it more 508 and usable. What else can I do to improve this?

Show me every instantce of <Stack> from Mantine, just the previous 3 and following 3 lines of code around the opening and cliosing of
a tag mentioned

Can can also scan (above) for similar types, like `if theres a variable called authToken and always has a declaration of string|null, then create a type for it

For types specific to a component, put the type in the same file as the component and for all sub components, put the type in the same file as the parent component,
in other words, keep all local types in a central type.ts file as close to the parent component as possible, and forbid (via code review) use of those
types from outside that component's directory. If another component reaches out like ../../components/OtherComponent/types.ts, then that's a code smell and
we need more of these checks to fix those as well. I dont think linting rules can figure that out.


