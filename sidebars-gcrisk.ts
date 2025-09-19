import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  gcriskSidebar: [
    {
      type: 'category',
      label: 'GCRisk',
      collapsed: false,
      items: [
        'index',
        'arquitectura',
        'instalacion',
      ],
    },
    {
      type: 'category',
      label: 'Código',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'FRONTEND',
          collapsed: false,
          items: [
            {
              type: 'category',
              label: 'SARC',
              collapsed: false,
              items: [
                'codigo/frontend/SARC/concentracion-deudores',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'BACKEND',
          collapsed: false,
          items: [
            {
              type: 'category',
              label: 'SARC',
              collapsed: false,
              items: [
                'codigo/backend/SARC/concentracion-deudores',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'BASE DE DATOS',
          collapsed: false,
          items: [
            'codigo/base-datos/concentracion-deudores',
          ],
        },
      ],
    },
  ],
};

export default sidebars;