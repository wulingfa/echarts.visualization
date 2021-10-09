import Vue from 'vue'
import VueRouter from 'vue-router'
// import sellerpage from '@/views/sellerpage'
// import Trendpage from '@/views/Trendpage'
// import MapPage from '@/views/MapPage'
// import RankPage from '@/views/RankPage'
// import HotPage from '@/views/HotPage'
// import StockPage from '@/views/StockPage'
import ScreenPage from '@/views/ScreenPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/screen'
  },
  {
    path: '/screen',
    component: ScreenPage
  }
  // {
  //   path: '/sellerpage',
  //   component: sellerpage
  // },
  // {
  //   path: '/trendpage',
  //   component: Trendpage
  // },
  // {
  //   path: '/mappage',
  //   component: MapPage
  // },
  // {
  //   path: '/rankpage',
  //   component: RankPage
  // },
  // {
  //   path: '/hotpage',
  //   component: HotPage 
  // },
  // {
  //   path: '/stockpage',
  //   component:  StockPage
  // }
]

const router = new VueRouter({
  routes
})

export default router
