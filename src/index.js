 // 首先导入封装的组件
 import Malert from './component/Alert'
 import Dialog from './component/Dialog'
 import Drawer from './component/Drawer'

 const components = [
   Malert, Dialog, Drawer
 ]

 const install = function(Vue) {
   components.forEach(component => {
     Vue.component(component.name, component);
   })
 }

 if (typeof window !== 'undefined' && window.Vue) {
   install(window.Vue);
 }

 export default install
