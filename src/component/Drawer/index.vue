<template>
  <el-drawer
    :title="title"
    :visible.sync="isVisible"
    :direction="direction"
    :wrapper-closable="wrapperClosable"
    :custom-class="isShowFooter ? 'has-footer': ''"
    size="44%"
    :before-close="handleClose"
  >
    <el-scrollbar style="height: 100%">
      <slot name="drawer" />
    </el-scrollbar>
    <div v-if="isShowFooter" class="drawer-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="onConfirmDrawer">确定</el-button>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'Drawer',
  components: {},
  props: {
    // 是否显示抽屉
    isVisible: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 抽屉从哪个方向出现 不传则默认从右侧往左
    // 值可以为 ltr（从左往右开） rtl（从右往左开） ttb（从上往下开）  btt（从下往上开）
    direction: {
      type: String,
      default: 'rtl'
    },
    // 是否显示底部
    isShowFooter: {
      type: Boolean,
      default: false
    },
    // 点击遮罩层是否可以关闭抽屉
    wrapperClosable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {
    deep: true
  },
  created() {
  },
  mounted() {
  },
  methods: {
    /**
       * 关闭抽屉的回调
       */
    handleClose() {
      this.$emit('close', {})
    },
    onConfirmDrawer() {
      this.$emit('confirm', {})
    }
  }
}
</script>

<style  lang="scss">
  .el-drawer__container{
    overflow: hidden;
    position: relative;
    .el-drawer{
      max-width: 640px !important;
      &.has-footer{
        padding-bottom: 52px;
        box-sizing: border-box;
        height: 100%;
      }
    }
    .el-drawer__header{
      margin: 0;
      padding: 0 16px;
      height: 52px;
      line-height: 52px;
      font-size:16px;
      font-weight: 900;
      border-bottom: 1px solid rgba(233,233,233,1);
      color: rgba(0, 0, 0, .85);
    }
    .el-drawer__body{
      width: 100%;
      height: 100%;
      padding: 16px;
      .el-scrollbar__wrap{
        overflow-x: hidden;
      }
    }
    .drawer-footer{
      width: 100%;
      height: 52px;
      line-height: 52px;
      border-top: 1px solid rgba(233,233,233,1);
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0 16px;
      text-align: right;
    }
  }

</style>
