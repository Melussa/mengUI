<template>
  <el-alert
    v-if="isShow"
    :title="title"
    :type="type"
    :show-icon="isShowIcon"
    class="common-alert"
    @close="onCloseEvent"
  />
</template>

<script>
export default {
  name: 'Index',
  components: {},
  props: {
    // 是否显示
    isShow: {
      type: Boolean,
      default: false
    },
    // 提示内容
    title: {
      type: String,
      default: ''
    },
    // 提示框样式  info   success  warning error
    type: {
      type: String,
      default: 'success'
    },
    // 是否显示图标
    isShowIcon: {
      type: Boolean,
      default: false
    },
    // 是否自动消失(默认自动消失)
    isAutoClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isAutoCloseTimeout: null
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  updated() {
    const { isAutoClose, isShow } = this

    if (isAutoClose && isShow) {
      this.isAutoCloseTimeout = setTimeout(() => {
        this.$emit('closeAlert', false)
      }, 3000)
    }
  },
  beforeDestroy() {
    const { isAutoCloseTimeout } = this
    clearTimeout(isAutoCloseTimeout)
  },
  methods: {
    onCloseEvent() {
      this.$emit('closeAlert', false)
    }
  }
}

</script>

<style scoped lang="scss">
.common-alert{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3000;
}
</style>
