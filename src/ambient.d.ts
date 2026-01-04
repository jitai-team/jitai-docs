declare module "*.module.css" {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module "@site/*";

declare module "react" {
    export type ReactNode = any;
    export type Key = string | number;

    export type EffectCallback = () => void | (() => void);
    export type ReactElement<T = any> = any;

    export interface Attributes {
        key?: Key;
    }

    export interface ClassAttributes<T> extends Attributes {
        ref?: any;
    }

    export type SetStateAction<S> = S | ((prevState: S) => S);
    export type Dispatch<A> = (value: A) => void;

    export type FC<P = {}> = (props: P) => any;

    export function useState<S>(
        initialState: S
    ): [S, Dispatch<SetStateAction<S>>];
    export function useMemo<T>(factory: () => T, deps: any[]): T;
    export function useEffect(effect: EffectCallback, deps?: any[]): void;

    export function cloneElement(
        element: any,
        props?: any,
        ...children: any[]
    ): any;
    export function isValidElement(object: any): boolean;

    const React: any;
    export default React;
}

declare module "@docusaurus/Head" {
    const Head: any;
    export default Head;
}

declare module "@theme/Layout" {
    const Layout: any;
    export default Layout;
}

declare module "@docusaurus/useDocusaurusContext" {
    const useDocusaurusContext: any;
    export default useDocusaurusContext;
}

declare module "react/jsx-runtime" {
    export const Fragment: any;
    export const jsx: any;
    export const jsxs: any;
}

declare module "lucide-react" {
    export const AlertTriangle: any;
    export const ArrowRight: any;
    export const Building2: any;
    export const Check: any;
    export const CheckCircle: any;
    export const ChevronDown: any;
    export const ChevronUp: any;
    export const CloudOff: any;
    export const Code: any;
    export const Code2: any;
    export const Container: any;
    export const Cpu: any;
    export const Database: any;
    export const FileCheck: any;
    export const GitBranch: any;
    export const Layers: any;
    export const Layout: any;
    export const Lock: any;
    export const Network: any;
    export const Server: any;
    export const ShieldCheck: any;
    export const TrendingUp: any;
}

declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}
