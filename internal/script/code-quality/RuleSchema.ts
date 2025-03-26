/* eslint-disable max-len */

import { ResponseFormat } from "./ResponseFormat.enum";
import { Rule } from "./type";


export const RuleSchema: Rule[] = [
    {
        id       : "VisibilityModifiers",
        versions : [
            {
                version     : "1.0.0",
                description : "Always include `public`, `private`, or `protected` visibility modifiers for class properties and methods.",
                parameters  : {
                    temperature    : 0.5,
                    responseFormat : ResponseFormat.Detailed,
                },
                customGuidelines : [],
            },
            {
                version     : "1.1.0",
                description : "Include visibility modifiers and ensure they are consistent across the codebase.",
                parameters  : {
                    temperature    : 0.6,
                    responseFormat : ResponseFormat.Detailed,
                },
                customGuidelines : [],
            },
        ],
    },
    {
        id       : "SmallFunctions",
        versions : [
            {
                version     : "1.0.0",
                description : "Break functions down into the smallest possible units, suitable for testing.",
                parameters  : {
                    temperature    : 0.5,
                    responseFormat : ResponseFormat.Detailed,
                },
                customGuidelines : [],
            },
        ],
    },
    {
        id       : "CommentBlockUsage",
        versions : [
            {
                version     : "1.0.0",
                description : "Include a comment block with the following information: Description, Usage",
                parameters  : {
                    temperature    : 0.5,
                    responseFormat : ResponseFormat.Detailed,
                },
                customGuidelines : [],
            },
        ],
    },
    {
        id       : "TypeHinting",
        versions : [
            {
                version     : "1.0.0",
                description : "Use type hinting for all function arguments and return values.",
                parameters  : {
                    temperature    : 0.5,
                    responseFormat : ResponseFormat.Detailed,
                },
                customGuidelines : [],
            },
            {
                version     : "1.1.0",
                description : "Use type hinting for all function arguments and return values. Ensure that all types are imported from a central location.",
                parameters  : {
                    temperature    : 0.6,
                    responseFormat : ResponseFormat.Detailed,
                },
                customGuidelines : [],
            },
        ],
    },
    {
        id       : "TSDocComments",
        versions : [
            {
                version     : "1.0.0",
                description : "Include TSDoc comments for all functions and classes. Omit parameter type information, just use `@param name - description`. Comment all code thoroughly.",
                parameters  : {
                    temperature    : 0.5,
                    responseFormat : ResponseFormat.Detailed,
                },
                customGuidelines : [],
            },
        ],
    },
    {
        id       : "LoggingLevels",
        versions : [
            {
                version     : "1.0.0",
                description : "Include copious logging of appropriate levels and information: `error` - For errors, `warn` - For warnings, `info` - For informational messages, `debug` - Include debug information and shallow IDs, `silly` - Include debug information and full data",
                parameters  : {
                    temperature    : 0.5,
                    responseFormat : ResponseFormat.Detailed,
                },
                customGuidelines : [],
            },
            {
                version     : "1.1.0",
                description : "Expand logging to include additional context information: `error` - For errors, `warn` - For warnings, `info` - For informational messages, `debug` - Include debug information and shallow IDs, `silly` - Include debug information and full data",
                parameters  : {
                    temperature    : 0.6,
                    responseFormat : ResponseFormat.Detailed,
                },
                customGuidelines : [],
            },
            {
                version     : "2.0.0",
                description : "Revamp logging system to support dynamic logging levels and contexts.",
                parameters  : {
                    temperature    : 0.7,
                    responseFormat : ResponseFormat.Detailed,
                },
                customGuidelines : [],
            },
        ],
    },
    {
        id       : "CodeStyleConventions",
        versions : [
            {
                version     : "1.0.0",
                description : "Use Arrow Functions when possible (note: decorated functions cannot be arrow functions). Align semicolons on objects. Sort imports by line length. Use 4 spaces for indentation. Omit useless parentheses. Omit useless braces.",
                parameters  : {
                    temperature    : 0.5,
                    responseFormat : ResponseFormat.Detailed,
                },
                customGuidelines : [],
            },
        ],
    },
    {
        id       : "DefensiveErrorChecking",
        versions : [
            {
                version     : "1.0.0",
                description : "Use thorough defensive error checking. Validate all inputs. Rethrow any caught errors so the central Exception handler can treat them uniformly.",
                parameters  : {
                    temperature    : 0.5,
                    responseFormat : ResponseFormat.Detailed,
                },
                customGuidelines : [],
            },
        ],
    },
    {
        id       : "ComponentInstanceListing",
        versions : [
            {
                version     : "1.0.0",
                description : "Upload a codebase MD file to list all files with any instance of a Box component, print out the Box + props, and remove the children. Show every instance of `<Stack>` from Mantine, including the previous 3 and following 3 lines of code around the opening and closing tags.",
                parameters  : {
                    temperature    : 0.5,
                    responseFormat : ResponseFormat.Detailed,
                },
                customGuidelines : [],
            },
        ],
    },
    {
        id       : "ComponentSpecificTypes",
        versions : [
            {
                version     : "1.0.0",
                description : "Create types for variables like `authToken` if they always have a declaration of `string|null`. For types specific to a component, put the type in the same file as the component. For all subcomponents, put the type in the same file as the parent component. Keep all local types in a central `type.ts` file as close to the parent component as possible. Forbid (via code review) the use of those types from outside the component's directory. If another component reaches out like `../../components/OtherComponent/types.ts`, then that's a code smell and needs more checks to fix.",
                parameters  : {
                    temperature    : 0.5,
                    responseFormat : ResponseFormat.Detailed,
                },
                customGuidelines : [],
            },
        ],
    },
];

/* eslint-enable max-len */
