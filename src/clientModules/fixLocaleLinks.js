const ZH_PREFIX = "/zh";
const LOCALE_SELECTOR = 'a[lang="en"], a[lang="zh"]';

function withTrailingSlash(pathname) {
    return pathname === "" ? "/" : pathname;
}

function getLocalizedPath(locale, pathname) {
    const normalizedPath = withTrailingSlash(pathname || "/");
    const isZhPath =
        normalizedPath === ZH_PREFIX ||
        normalizedPath.startsWith(`${ZH_PREFIX}/`);

    if (locale === "zh") {
        if (isZhPath) {
            return normalizedPath;
        }

        return normalizedPath === "/" ? "/zh/" : `/zh${normalizedPath}`;
    }

    if (!isZhPath) {
        return normalizedPath;
    }

    const withoutPrefix = normalizedPath.slice(ZH_PREFIX.length);
    return withoutPrefix === "" ? "/" : withoutPrefix;
}

function getLocaleHref(locale) {
    const { pathname, search, hash } = window.location;
    return `${getLocalizedPath(locale, pathname)}${search}${hash}`;
}

function schedulePatchLocaleLinks() {
    window.setTimeout(patchLocaleLinks, 0);
    window.setTimeout(patchLocaleLinks, 100);
    window.setTimeout(patchLocaleLinks, 500);
}

function handleLocaleClick(event) {
    const link = event.target.closest?.(LOCALE_SELECTOR);

    if (!link) {
        return;
    }

    const locale = link.getAttribute("lang");

    if (locale !== "en" && locale !== "zh") {
        return;
    }

    event.preventDefault();
    window.location.href = getLocaleHref(locale);
}

function patchLocaleLinks() {
    if (typeof window === "undefined" || typeof document === "undefined") {
        return;
    }

    document.querySelectorAll(LOCALE_SELECTOR).forEach((link) => {
        const locale = link.getAttribute("lang");

        if (locale !== "en" && locale !== "zh") {
            return;
        }

        const href = getLocaleHref(locale);
        link.setAttribute("href", href);
    });
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
    document.addEventListener("click", handleLocaleClick, true);

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", schedulePatchLocaleLinks);
    } else {
        schedulePatchLocaleLinks();
    }
}

export function onRouteDidUpdate() {
    schedulePatchLocaleLinks();
}
