import { type PayloadAction } from '@reduxjs/toolkit';


export type CoreAction<T = unknown> = PayloadAction<T>;

export type CA = CoreAction;
