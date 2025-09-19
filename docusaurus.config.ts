import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Garantías Comunitarias",
  tagline: "Documentación Técnica Beta",
  favicon: "img/favicon.ico",

  url: "https://docs.garantiascomunitarias.com",
  baseUrl: "/",

  organizationName: "garantias-comunitarias",
  projectName: "documentacion-tecnica",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          id: "default",
          path: "docs/general",
          routeBasePath: "docs",
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/garantias-comunitarias/documentacion-tecnica/tree/main/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "gcrisk",
        path: "docs/gcrisk",
        routeBasePath: "gcrisk",
        sidebarPath: "./sidebars-gcrisk.ts",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "gcbloomrisk",
        path: "docs/gcbloomrisk",
        routeBasePath: "gcbloomrisk",
        sidebarPath: "./sidebars-gcbloomrisk.ts",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "gcm",
        path: "docs/gcm",
        routeBasePath: "gcm",
        sidebarPath: "./sidebars-gcm.ts",
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "gcmutual",
        path: "docs/gcmutual",
        routeBasePath: "gcmutual",
        sidebarPath: "./sidebars-gcmutual.ts",
      },
    ],
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        language: ["es", "en"],
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: ["/docs", "/gcrisk", "/gcbloomrisk", "/gcm", "/gcmutual"],
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        explicitSearchResultPath: false,
      },
    ],
  ],

  themeConfig: {
    image: "img/Assets/BrandingEmpresarial/BannerGC1.png",
    navbar: {
      logo: {
        alt: "Garantías Comunitarias Logo",
        src: "img/Assets/BrandingEmpresarial/BannerGC1.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "mainSidebar",
          position: "left",
          label: "Docusaurus",
        },
        {
          to: "/gcrisk/",
          position: "left",
          label: "GCRisk",
        },
        {
          to: "/gcbloomrisk/",
          position: "left",
          label: "GCBloomRisk",
        },
        {
          to: "/gcm/",
          position: "left",
          label: "GCM",
        },
        {
          to: "/gcmutual/",
          position: "left",
          label: "GCMutual",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © 2025 Garantías Comunitarias`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
