declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
}

declare function require(path: string): any;

declare module "@docusaurus/Head" {
    const Head: any;
    export default Head;
}

declare module "@docusaurus/useBaseUrl" {
    const useBaseUrl: any;
    export default useBaseUrl;
}

declare module "*.svg?react" {
    const ReactComponent: any;
    export default ReactComponent;
}

declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}
