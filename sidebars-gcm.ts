import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  gcmSidebar: [
    {
      type: 'category',
      label: 'GCM',
      collapsed: false,
      items: [
        'index',
        'contexto-objetivo',
      ],
    },
  ],
};

export default sidebars;