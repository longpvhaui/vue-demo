export default [
  {
    title: 'Misc',
    icon: { icon: 'tabler-box-multiple' },
    children: [
      {
        title: 'Access Control',
        icon: { icon: 'tabler-command' },
        to: 'access-control',
        action: 'manage',
        subject: 'AclDemo',
      },
      {
        title: 'Nav Levels',
        icon: { icon: 'tabler-menu-2' },

        children: [
          {
            title: 'Level 2.1',
            to: null,
            action: 'read',
            subject: 'AclDemo',
          },
          {
            title: 'Level 2.2',
            children: [
              {
                title: 'Level 3.1',
                to: null,
                action: 'read',
                subject: 'AclDemo',
              },
              {
                title: 'Level 3.2',
                to: null,
                action: 'read',
                subject: 'AclDemo',
              },
            ],
          },
        ],
      },
      {
        title: 'Disabled Menu',
        to: null,
        icon: { icon: 'tabler-eye-off' },
        disable: true,
      },
      {
        title: 'Raise Support',
        href: 'https://pixinvent.ticksy.com/',
        icon: { icon: 'tabler-headphones' },
        target: '_blank',
      },
      {
        title: 'Documentation',
        href: 'https://demos.pixinvent.com/vuexy-vuejs-admin-template/documentation/',
        icon: { icon: 'tabler-file-text' },
        target: '_blank',
        action: 'read',
        subject: 'AclDemo',
      },
    ],
  },
]