export enum Color {
    Reset = "\x1b[0m",
    Red = "\x1b[31m",
    Green = "\x1b[32m",
    Yellow = "\x1b[33m",
    Blue = "\x1b[34m",
    Magenta = "\x1b[35m",
    Cyan = "\x1b[36m",
}

export const logColor = (message: string, color: Color = Color.Reset): void => {
    console.log(`${color}${message}${Color.Reset}`);
};
