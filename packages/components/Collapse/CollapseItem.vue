<script setup lang="ts">
import type { CollapseItemProps } from './types'
import { inject,computed } from 'vue'
import { COLLAPSE_CTX_KEY } from './constants';
import IIcon from '../Icon/Icon.vue';

defineOptions({
    name: 'ICollapseItem'
})
const props = defineProps<CollapseItemProps>()
const ctx = inject(COLLAPSE_CTX_KEY, void 0)
const isActive = computed(() => ctx?.activeNames.value.includes(props.name))
function handleClick() {
    if(props.disabled) return
    ctx?.handleItemClick(props.name)
}
</script>

<template>
    <div
      class="i-collapse-item"
      :class="{
        'is-disabled': disabled,
      }"
    >
      <div
        class="i-collapse-item__header"
        :id="`item-header-${name}`"
        :class="{
          'is-disabled': disabled,
          'is-active': isActive,
        }"
        @click="handleClick"
      >
        <span class="i-collapse-item__title">
          <slot name="title">
            {{ title }}
          </slot>
        </span>
        <i-icon icon="angle-right" class="header-angle" />
      </div>
      <div class="i-collapse-item__wapper" v-show="isActive">
        <div class="i-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </div>
  </template>

<style scoped>
@import './style.css';
</style>