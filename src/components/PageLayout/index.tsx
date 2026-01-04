import React, {
    useEffect,
    ReactNode,
    cloneElement,
    isValidElement,
} from "react";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import Navbar from "./Navbar";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { PAGE_METADATA_EN } from "./page-metadata-en";
import { PAGE_METADATA_ZH } from "./page-metadata-zh";

const LayoutComponent = Layout as React.ComponentType<any>;

interface PageLayoutProps {
    children: ReactNode;
    pageId: string;
    title?: string;
    description?: string;
    containerClassName?: string;
    withLayout?: boolean; // 是否包裹主题 Layout，默认 true
    hideLanguageSwitcher?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
    children,
    pageId,
    title,
    description,
    containerClassName = "",
    withLayout = true,
    hideLanguageSwitcher,
}) => {
    const { i18n } = useDocusaurusContext();

    // 根据 pageId 和语言获取页面元数据
    const metadata =
        i18n.currentLocale === "zh" ? PAGE_METADATA_ZH : PAGE_METADATA_EN;
    const pageMetadata = metadata[pageId] || metadata["index"];

    // 使用传入的 title/description 或默认的元数据
    const finalTitle = title || pageMetadata.title;
    const finalDescription = description || pageMetadata.description;

    // 为子组件注入 currentLocale prop
    const childrenWithProps = React.Children.map(children, (child: any) => {
        if (isValidElement(child)) {
            return cloneElement(child, {
                currentLocale: i18n.currentLocale,
            });
        }
        return child;
    });

    const content = (
        <>
            <Head
                title={finalTitle}
                titleTemplate="%s - JitAI"
                meta={[
                    { name: "description", content: finalDescription },
                    { property: "og:title", content: finalTitle },
                    { property: "og:description", content: finalDescription },
                    { name: "twitter:title", content: finalTitle },
                    { name: "twitter:description", content: finalDescription },
                ]}
                children={<></>}
            />
            <div className={`${containerClassName} custom-page`}>
                <Navbar
                    currentLocale={i18n.currentLocale}
                    hideLanguageSwitcher={hideLanguageSwitcher}
                />
                {childrenWithProps}
            </div>
        </>
    );

    return withLayout ? <LayoutComponent>{content}</LayoutComponent> : content;
};

export default PageLayout;
