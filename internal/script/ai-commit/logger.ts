export enum Color {
    Magenta = "\x1b[35m",
    Yellow  = "\x1b[33m",
    Green   = "\x1b[32m",
    Reset   = "\x1b[0m",
    Blue    = "\x1b[34m",
    Cyan    = "\x1b[36m",
    Red     = "\x1b[31m",
}

export const logColor = (
    message: string,
    color: Color = Color.Reset,
): void =>
    console.log(`${color}${message}${Color.Reset}`);
