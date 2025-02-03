<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { useField } from 'vee-validate'

interface Props {
  name: string
  label?: string
  mask?: string
  type?: 'text' | 'textarea' | 'password'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

const { value, errorMessage } = useField<string | undefined>(props.name)
</script>

<template>
  <ElFormItem
    class="common-input-item [&.asterisk-left]:!items-center [&>label]:truncate"
    :error="errorMessage && errorMessage.includes('Required') ? 'Required' : errorMessage"
    :label="props.label"
  >
    <ElInput
      v-if="props.mask?.length"
      size="large"
      placeholder="Please enter"
      :type="props.type"
      v-model="value"
      v-mask="props.mask"
      v-bind="$attrs"
    />
    <ElInput v-else size="large" placeholder="Please enter" :type="props.type" v-model="value" v-bind="$attrs" />
  </ElFormItem>
</template>

<style lang="scss">
.common-input-item {
  .el-input--large {
    --el-input-height: 50px;
    font-size: 16px;

    &.is-disabled .el-input__wrapper {
      box-shadow: none !important;
    }
  }

  .el-form-item__error {
    overflow: hidden !important;
    display: -webkit-box !important;
    -webkit-box-orient: vertical !important;
    -webkit-line-clamp: 1 !important;
  }

  .el-input {
    --el-input-text-color: rgba(33, 33, 33, 1);
    --el-input-border-color: transparent;
    --el-input-border-radius: 6px;
    --el-input-bg-color: rgba(238, 242, 246, 1);
    --el-input-icon-color: rgba(29, 29, 29, 1);
    --el-input-placeholder-color: rgba(29, 29, 29, 0.6);
    --el-input-hover-border-color: rgba(26, 127, 219, 1);
    --el-input-focus-border-color: rgba(26, 127, 219, 1);
  }

  .el-textarea {
    --el-input-text-color: rgba(33, 33, 33, 1);
    --el-input-border-color: transparent;
    --el-input-border-radius: 6px;
    --el-input-bg-color: rgba(238, 242, 246, 1);
    --el-input-placeholder-color: rgba(29, 29, 29, 0.6);
    --el-input-hover-border-color: rgba(26, 127, 219, 1);
    --el-input-focus-border-color: rgba(26, 127, 219, 1);

    textarea {
      min-height: 160px !important;
      padding: 12px 17px !important;
    }
  }
}
</style>
