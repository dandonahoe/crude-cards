import { GetServerSideProps, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ReactElement } from 'react';


export type CorePropsWithChildren<T = unknown> = T & React.PropsWithChildren;
export type CoreProps<T = unknown> = Omit<CorePropsWithChildren<T>, 'children'>;
export type RFC<T = unknown> = React.FC<T>;
export type SSR<
    PR  extends {
        [key : string] : unknown;
    },
    PQ  extends ParsedUrlQuery = ParsedUrlQuery,
    PRE extends PreviewData    = PreviewData> =
    GetServerSideProps<PR, PQ, PRE>;

export type RE = ReactElement;
