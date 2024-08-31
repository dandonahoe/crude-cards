import { localConstant } from '@app/constant/framework/MakeConstant';
import { createAction } from '@reduxjs/toolkit';


const ActionTypePrefix = localConstant('Action');

export const actionName = (name: string): string => ActionTypePrefix(name);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const action = <T = undefined>(actionNamePrefix: string, usePrefix : boolean = true) =>
    createAction<T>(
        usePrefix
            ? actionName(actionNamePrefix)
            : actionNamePrefix);
