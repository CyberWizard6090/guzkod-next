declare global {
  type FirstArg<T> = T extends (arg: infer A) => Promise<any>
    ? A
    : T extends (arg: infer A) => any
      ? A
      : never;
}
