declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
}

interface RequireFunction {
    (path: string): any;
    resolve: (path: string) => string;
}

declare const require: RequireFunction;

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

declare module "@docusaurus/plugin-content-blog/client" {
    export { useBlogPost, useBlogMetadata } from "@docusaurus/plugin-content-blog/lib/client/contexts";
    export { useBlogListPageStructuredData, useBlogPostStructuredData } from "@docusaurus/plugin-content-blog/lib/client/structuredDataUtils";
    export { BlogSidebarItemList, groupBlogSidebarItemsByYear, useVisibleBlogSidebarItems } from "@docusaurus/plugin-content-blog/lib/client/sidebarUtils";
}

// React 19 JSX compatibility: components returning ReactNode are valid JSX elements
// Override the strict JSX.ElementType check that requires Promise<ReactNode>
type ReactApp = (props: any) => React.ReactNode;
