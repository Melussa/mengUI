 // 首先导入封装的组件
 // import Test from ''

 const mengui = {
  install(Vue) {
    // Vue.component('Test', Test);
  }
 }
 if(typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(mengui)
 }

export default mengui
