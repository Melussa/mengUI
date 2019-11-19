<template>

  <!-- 表格操作对应弹出层 -->
  <div class="myy-dialog">
    <el-dialog
      v-if="isShowDialog"
      ref="dialog"
      :custom-class="isShowPagination ? `dialog-mask dialog-show-page`: `dialog-mask`"
      :class="dialogSize?`myy-dialog-${dialogSize}`:''"
      :visible.sync="isShowDialog"
      :close-on-click-modal="false"
      :before-close="myyDialogClose"
    >
      <template slot="title">
        <span class="dialog-title" :title="title">{{ title }}</span>
      </template>
      <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper" :style="`height: ${scrollHeight}px; min-height: 148px`">
        <!-- 弹出层form表单插槽定义 -->
        <slot name="dialogSlot" />
      </el-scrollbar>
      <el-pagination
        v-show="isShowPagination"
        background
        :total="total"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :class="`pagination-${position}`"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <div slot="footer" class="dialog-footer">
        <el-button
          v-for="(option,key) in dialogOption"
          :key="key"
          :type="option.type"
          @click="onConfirmEvent(option)"
        >
          <span v-if="option.isShow">{{ option.name }}</span>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  components: { },
  props: {
    // 父组件所在this
    myyDialog: {
      type: Object,
      default() {}
    },
    // 是否显示dialog
    isShowDialog: {
      type: Boolean,
      default: false
    },
    // dialog标题
    title: {
      type: String,
      default: ''
    },
    // Dialog 宽度
    dialogSize: {
      type: String,
      default: 'mini'
    },
    // dialog底部操作按钮  默认为确定或则取消
    dialogOption: {
      type: Array,
      default() {
        return [
          { name: '取消', isShow: true, btnType: 'cancel', type: 'default', fun: 'onCancelEvent' },
          { name: '确定', isShow: true, btnType: 'confirm', type: 'primary', fun: 'onConfirmEvent' }
        ]
      }
    },
    // 是否显示翻页
    isShowPagination: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'right'
    },
    // 总共条数
    total: {
      type: Number,
      default: 0
    },
    // 当前页码
    page: {
      type: Number,
      default: 1
    },
    // 每页显示条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 可选当每页显示条数
    pageSizes: {
      type: Array,
      default() {
        return [1, 2, 3, 4, 10].map((value) => {
          return value * 10
        })
      }
    }
  },
  data() {
    return {
      scrollHeight: ''
    }
  },
  mounted() {
    if (this.isShowDialog) {
      this.getScrollHeight()
    }
  },
  methods: {
    /**
     * 获取scrollbar当前高度
     * */
    getScrollHeight() {
      this.$nextTick(() => {
        const { dialog } = this.$refs
        const dialogBody = dialog.$el.firstChild.children[1]
        this.scrollHeight = dialogBody.offsetHeight - 55
      })
    },
    /**
     * @Method ：自定义dialog
     *
     */
    myyDialogClose() {
      this.$emit('onCloseDialog', false)
    },

    /**
     * 弹出层操作
     * 提交弹出层中form表单数据信息
     * @Method formSubmit
     */
    onConfirmEvent(param) {
      this.$emit('dialogHandleEvent', param)
      // 确认相应的功能之后 关闭dialog
      this.myyDialogClose()
    },
    /**
     * 改变每页显示条数
     * @param val
     */
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    },
    /**
     * 翻页（用箭头翻页  或者  直接选择页码）
     * @param val
     */
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>

<style lang="scss">
  $height: calc(100% - 108px);
  $minHeight: 300px;
  $maxHeight: 696px;
  .dialog-mask{
    min-height: $minHeight;
    margin-top: 100px !important;
    position: relative;
    .el-dialog__header{
      height: 56px;
      padding: 0 22px;
      line-height: 56px;
      border-bottom: 1px solid rgba(233,233,233,1);
      .dialog-title{
        font-size: 16px;
        font-weight: 900;
        color: rgba(0, 0, 0, .85);
        width: calc( 100% - 20px );
        text-overflow: ellipsis;
        -ms-text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .el-dialog__body{
      box-sizing: border-box;
      padding:22px;
      min-height: calc( #{$minHeight} - 108px );
      max-height: $maxHeight;
    }
    .pagination-left{
      text-align: left;
    }
    .pagination-center{
      text-align: center;
    }
    .pagination-right{
      text-align: right;
    }
    .el-dialog__footer{
      width: 100%;
      height: 52px;
      line-height: 52px;
      border-top: 1px solid rgba(233,233,233,1);
      padding: 0 22px;
    }
  }
  /* 不同大小的dialog宽度 */
  .myy-dialog-mini{
    .el-dialog{
      width: 560px;
    }
  }
  .myy-dialog-small{
    .el-dialog{
      width: 720px;
    }
  }
  .myy-dialog-large{
    .el-dialog{
      width: 960px;
    }
  }
</style>
