
const routes = [
  {
    path: '',
    component: () => import('src/layouts/home.vue'),
    children: [
      { path: '', name: 'admin', component: () => import('src/pages/admin.vue'), },
    ]
  },
]

export default routes
