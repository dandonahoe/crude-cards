export type Optional<T> = {
    [P in keyof T] ?: T[P]
};

export  type O<T> = Optional<T>;
