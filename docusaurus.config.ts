import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
    title: "My Site",
    tagline: "Dinosaurs are cool",
    favicon: "img/favicon.ico",

    // Set the production url of your site here
    url: "https://blxie.github.io",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "blxie", // Usually your GitHub org/user name.
    projectName: "blxie.github.io", // Usually your repo name.

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            {
                docs: {
                    sidebarPath: "./sidebars.ts",
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
                sitemap: {
                    changefreq: "always",
                    priority: 0.5,
                    ignorePatterns: ["/tags/**"],
                    filename: "sitemap.xml",
                },
            },
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: "img/docusaurus-social-card.jpg",
        navbar: {
            title: "Blainet's Site",
            logo: {
                alt: "Blainet's Site Logo",
                src: "img/logo.svg",
            },
            items: [
                // 顶部栏
                {
                    type: "docSidebar",
                    sidebarId: "tutorialSidebar",
                    position: "left",
                    label: "Tutorial",
                },
                { to: "/blog", label: "Blog", position: "left" },
                // {
                //     href: "https://github.com/blxie/blxie.github.io",
                //     label: "GitHub",
                //     position: "right",
                // },
                // 顶部栏图标配置
                {
                    href: "https://github.com/blxie/blxie.github.io",
                    position: "right",
                    className: "header-github-link",
                    "aria-label": "GitHub repository",
                },
                {
                    position: "right",
                    to: "mailto:blxie@outlook.com",
                    className: "header-email-link",
                    "aria-label": "Email",
                },
                // 新增顶部栏
                {
                    type: "docSidebar",
                    label: "新栏目1",
                    sidebarId: "header-bar1",
                    position: "left",
                },
                {
                    type: "docSidebar",
                    label: "编程学习",
                    sidebarId: "bar-id-prog",
                    position: "left",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Docs",
                    items: [
                        {
                            label: "Tutorial",
                            to: "/docs/intro",
                        },
                    ],
                },
                {
                    title: "Community",
                    items: [
                        {
                            label: "Stack Overflow",
                            href: "https://stackoverflow.com/questions/tagged/docusaurus",
                        },
                        {
                            label: "Discord",
                            href: "https://discordapp.com/invite/docusaurus",
                        },
                        {
                            label: "Twitter",
                            href: "https://twitter.com/docusaurus",
                        },
                    ],
                },
                {
                    title: "More",
                    items: [
                        {
                            label: "Blog",
                            to: "/blog",
                        },
                        {
                            label: "GitHub",
                            href: "https://github.com/facebook/docusaurus",
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
        },

        // 主题配置
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },

        // docsearch 文档搜索
        // algolia: {
        //     // The application ID provided by Algolia
        //     appId: "",

        //     // Public API key: it is safe to commit it
        //     apiKey: "",

        //     indexName: "blainet-website",

        //     // Optional: see doc section below
        //     contextualSearch: true,

        //     // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        //     externalUrlRegex: "external\\.com|domain\\.com",

        //     // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        //     replaceSearchResultPathname: {
        //         from: "/docs/", // or as RegExp: /\/docs\//
        //         to: "/",
        //     },

        //     // Optional: Algolia search parameters
        //     searchParameters: {},

        //     // Optional: path for search page that enabled by default (`false` to disable it)
        //     searchPagePath: "search",

        //     //... other Algolia params
        // },
    } satisfies Preset.ThemeConfig,
};

export default config;
