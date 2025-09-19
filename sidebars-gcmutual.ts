import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  gcmutualSidebar: [
    {
      type: 'category',
      label: 'GC Mutual',
      collapsed: false,
      items: [
        'index',
        'contexto-objetivo',
      ],
    },
  ],
};

export default sidebars;