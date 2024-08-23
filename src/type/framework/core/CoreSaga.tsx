export type CoreSaga<T = unknown | void> = Generator<unknown, T>;
export type Saga<T = void> = CoreSaga<T>;
