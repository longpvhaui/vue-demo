export default [
  {
    path: '/brand',
    name: 'brand',
    component: () => import('@/views/brand/Brand.vue'),
    meta: {
      pageTitle: 'Chi nhánh',
      breadcrumb: [
        {
          text: 'Chi tiết',
          active: true,
        },
      ],
    },
  },
]
