import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

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
                // google搜索需要
                gtag: {
                    trackingID: "G-G4NRSZR6K3",
                    anonymizeIP: true,
                },
            } satisfies Preset.Options,
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
                {
                    href: "https://github.com/facebook/docusaurus",
                    label: "GitHub",
                    position: "right",
                },
                // 顶部栏图标配置
                {
                    href: "https://github.com/GitHubJackson/my-docs",
                    position: "right",
                    className: "header-github-link",
                    "aria-label": "GitHub",
                },
                {
                    href: "https://mail.google.com/?view=cm&fs=1&tf=1&to=bailian.xbl@gmail.com",
                    position: "right",
                    className: "header-email-link",
                    "aria-label": "Email",
                },
                // 新增顶部栏
                {
                    type: "docSidebar",
                    label: "新栏目1",
                    sidebarId: "new-tab1",
                    position: "left",
                },
                {
                    type: "docSidebar",
                    label: "新栏目2",
                    sidebarId: "new-tab2",
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
        algolia: {
            appId: "xxx", // Application ID
            apiKey: "xxx", //  Search-Only API Key
            indexName: "lucas'docs",
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
