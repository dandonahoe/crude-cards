import { useDispatch as useDispatchGeneric, useSelector as useSelectorGeneric } from 'react-redux';
import { useRouter as useRouterGeneric } from 'next/router';
import { type AppDispatch, type RootState } from './store';
import type { TypedUseSelectorHook } from 'react-redux';
import { type Dispatch } from '@reduxjs/toolkit';


export const useRouter = useRouterGeneric;

export const useDispatch = () : Dispatch => useDispatchGeneric<AppDispatch>();
export const useSelector : TypedUseSelectorHook<RootState> = useSelectorGeneric;

export const Hook = {
    useDispatch,
    useSelector,
    useRouter,
};

