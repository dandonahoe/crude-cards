import { Namespace } from './Namespace';


export const localConstant = (namespace = Namespace) =>
    (name : string) => `${namespace}/${name}` as const;
