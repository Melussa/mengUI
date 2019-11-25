<template>
  <el-form
    ref="form"
    class="page-form"
    :class="className"
    :model="data"
    :rules="rules"
    :label-width="labelWidth"
  >
    <el-row :gutter="10">
      <el-col :span="24 / colNum"  v-for="(item, index) in getConfigList()" :key="index">
        <el-form-item
          :key="index"
          :prop="item.value"
          :label="item.label"
          :class="item.value"
        >
          <!-- solt -->
          <template v-if="item.type === 'slot'">
            <slot :name="item.value" />
          </template>
          <!-- 普通输入框 -->
          <el-input
            v-if="(item.type === 'input' || item.type === 'password')"
            v-model="data[item.value]"
            :type="item.type"
            :disabled="item.disabled"
            :placeholder="getPlaceholder(item)"
            @focus="handleEvent(item.event)"
          />
          <!-- 计数器 -->
          <el-input-number
            v-if="item.type === 'inputNumber' "
            v-model="data[item.value]"
            size="small"
            :min="item.min"
            :max="item.max"
            @change="handleEvent(item.event)"
          />
          <!-- 选择框 -->
          <el-select
            v-if="item.type === 'select'"
            v-model="data[item.value]"
            :disabled="item.disabled"
            :clearable="item.clearable"
            :filterable="item.filterable"
            :placeholder="getPlaceholder(item)"
            @change="handleEvent(item.event, data[item.value])"
          >
            <el-option
              v-for="(childItem, childIndex) in listTypeInfo[item.list]"
              :key="childIndex"
              :label="childItem.label"
              :value="childItem.value"
            />
          </el-select>
          <!-- 文本输入框 -->
          <el-input
            v-if="item.type === 'textarea'"
            v-model.trim="data[item.value]"
            :type="item.type"
            :disabled="item.disabled"
            :placeholder="getPlaceholder(item)"
            :autosize="item.autosize || {minRows: 2, maxRows: 10}"
            @focus="handleEvent(item.event)"
          />
          <!-- 日期选择框 -->
          <el-date-picker
            v-if="item.type === 'date'"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="data[item.value]"
            :type="item.dateType"
            :picker-options="item.TimePickerOptions"
            :clearable="item.clearable"
            :disabled="item.disabled"
            :placeholder="!item.dateType.endsWith('range') ? getPlaceholder(item) : ''"
            :start-placeholder="getPlaceholder(item).start"
            :end-placeholder="getPlaceholder(item).end"
            @focus="handleEvent(item.event)"
          />
          <!-- 信息展示框 -->
          <!--      <el-input v-show="false" v-model="data[item.value]"></el-input>-->
          <el-tag v-if="item.type === 'tag'" size="default" class="form-tag"
                  v-for="(val, ind) in data[item.value]" closable
                  @close="handleClose(val, item.value)"
                  :key="ind">{{val.label}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible && item.type === 'tag'"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(item.value)"
            @blur="handleInputConfirm(item.value)"
          >
          </el-input>
          <el-button v-if="item.type === 'tag' && !inputVisible" icon="el-icon-plus" type="primary"  plain
                     class="button-new-tag" @click="showInput"> 新增{{item.label}} </el-button>
          <!-- radio选择 -->
          <el-radio-group
            v-if="item.type === 'radio'"
            v-model="data[item.value]"
            @change="handleEvent(item.event, data[item.value])">
            <el-radio
              v-for="(childItem, childIndex) in listTypeInfo[item.list]"
              :key="childIndex"
              :label="childItem.label">{{childItem.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 当行显示 -->
    <el-form-item  v-if="onelineList" class="el-form__oneline"
       v-for="(item, index) in onelineList"
       :key="index"
       :prop="item.value"
       :label="item.label"
       :class="item.value"
    >
      <template>
        <slot :name="item.value"/>
      </template>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="isLoading" @click="onSubmitEvent('form')"> 提 交 </el-button>
      <el-button type="default" @click="onCancelEvent('form')"> 取 消 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Form',
  props: {
    // 是否提交
    isLoading: {
      type: Boolean,
      default: false
    },
    // 单列显示还是多列显示
    colNum: {
      type: Number,
      default(){
        return 2
      }
    },
    // 多列显示的时候  特殊的 单列显示项
    onelineList: {
      type: Array,
      default(){
        return []
      }
    },
    // 自定义类名
    className: {
      type: String,
      default() { }
    },
    // 表单数据
    data: {
      type: Object,
      default() { }
    },
    // 相关字段
    fieldList: {
      type: Array,
      default() { }
    },
    // 验证规则
    rules: {
      type: Object,
      default() { }
    },
    // 相关的列表
    listTypeInfo: {
      type: Object,
      default() { }
    },
    // label宽度
    labelWidth: {
      type: String,
      default: '150px'
    },
    refObj: {
      type: Object,
      default() { }
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  watch: {
    data: {
      handler: function(val) {
        // 将form实例返回到父级
        this.$emit('update:refObj', this.$refs.form)
      },
      deep: true // 深度监听
    }
  },
  mounted() {
    // 将form实例返回到父级
    this.$emit('update:refObj', this.$refs.form)
  },
  methods: {
    // 获取字段列表
    getConfigList() {
      return this.fieldList.filter(item => !item.hasOwnProperty('show') || (item.hasOwnProperty('show') && item.show))
    },
    // 得到placeholder的显示
    getPlaceholder(row) {
      const { type, label } = row
      let placeholder, startEnd = {}
      switch (type){
        case 'input':
        case 'textarea':
        case 'password':
          placeholder = `请输入${label}`
          break
        case 'select':
        case 'inputNumber':
          placeholder = `请选择${label}`
          break
        case 'date':
          const { dateType } = row
          if ( dateType.endsWith('range') ){
            startEnd.start = `请选择开始时间`
            startEnd.end = `请选择开始时间`
          }else {
            placeholder = `请选择${label}`
          }
          break
        default:
          placeholder = label
      }
      if(!placeholder && Object.keys(startEnd).length > 0){
        return startEnd
      }else {
        return placeholder
      }
    },

    // 输入框等表单项 绑定的相关事件
    handleEvent(event) {
      this.$emit('formItemClick', event)
    },
    // 确认提交
    onSubmitEvent(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submit', formName)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    /**
     * 取消提交
     * @param formName
     */
    onCancelEvent(formName) {
      this.$refs[formName].resetFields();
      this.$emit('cancel', formName)
    },
    /**
     * 关闭标签
     * @param tag
     * @param list
     */
    handleClose(tag, list) {
      this.data[list].splice(this.data[list].indexOf(tag), 1);
    },
    /**
     * 新增标签  点击显示输入框
     */
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        const { saveTagInput } = this.$refs
        saveTagInput[0].$refs.input.focus();
      });
    },

    /**
     * 确认新增标签
     * @param list
     */
    handleInputConfirm(list) {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.data[list].push({
          label: inputValue
        });
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>

