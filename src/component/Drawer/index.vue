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

<style scoped lang="scss">

</style>
