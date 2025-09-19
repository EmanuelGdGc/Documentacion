import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  gcbloomriskSidebar: [
    {
      type: 'category',
      label: 'GC Bloom Risk',
      collapsed: false,
      items: [
        'index',
        'contexto-objetivo',
      ],
    },
  ],
};

export default sidebars;