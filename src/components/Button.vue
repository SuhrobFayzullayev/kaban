<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'success' | 'danger'
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
})
</script>

<template>
  <ElButton size="large" class="common-btn uppercase" :type="props.variant"> {{ label }} <slot /> </ElButton>
</template>

<style lang="scss">
.common-btn {
  &.el-button--large {
    height: 50px;
    margin-top: 10px;
    border: none !important;
    --el-button-size: 13px;
    padding: 20px 26px;
    font-size: 14px;
    font-weight: 700;
    border-radius: 6px;
  }

  &.el-button--primary {
    --el-button-bg-color: rgba(26, 127, 219, 1);
    --el-button-hover-bg-color: rgba(26, 127, 219, 0.8);
    --el-button-active-bg-color: rgba(26, 127, 219, 0.8);
    --el-button-disabled-bg-color: rgba(26, 127, 219, 0.8);
  }
  &.el-button--primary.is-plain {
    --el-button-text-color: rgba(26, 127, 219, 1);
    --el-button-bg-color: rgba(238, 242, 246, 1);
    --el-button-hover-text-color: rgba(26, 127, 219, 1);
    --el-button-hover-bg-color: rgba(238, 242, 246, 0.8);
    --el-button-active-text-color: rgba(26, 127, 219, 1);
    --el-button-active-bg-color: rgba(238, 242, 246, 0.8);
    --el-button-disabled-bg-color: rgba(238, 242, 246, 0.8);
  }
  &.el-button--success {
    --el-button-bg-color: rgba(59, 195, 73, 1);
    --el-button-hover-bg-color: rgba(59, 195, 73, 0.8);
    --el-button-active-bg-color: rgba(59, 195, 73, 0.8);
    --el-button-disabled-bg-color: rgba(59, 195, 73, 0.8);
  }
  &.el-button--danger {
    --el-button-bg-color: rgba(255, 6, 15, 1);
    --el-button-hover-bg-color: rgba(255, 6, 15, 0.8);
    --el-button-active-bg-color: rgba(255, 6, 15, 0.8);
    --el-button-disabled-bg-color: rgba(255, 6, 15, 0.8);
  }
}
</style>
