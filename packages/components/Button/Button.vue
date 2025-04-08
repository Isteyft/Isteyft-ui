<script setup lang="ts">
import { ref, computed } from "vue";
import type {ButtonProps, ButtonEmits, ButtonInstance} from './types'
import {throttle} from 'lodash-es'
// import { IIcon } from "Isteyft-ui";
import IIcon from "../Icon/Icon.vue"

defineOptions({
    name: 'IButton'
})
const props =  withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
  useThrottle: true,
  throttleDuration: 500
})

const emits = defineEmits<ButtonEmits>()

const slots = defineSlots()

const _ref = ref<HTMLButtonElement>()
const iconStyle = computed(()=>{marginRight: slots.default ? "6px" : "0px"})


const hanleBtnClick = throttle((e:MouseEvent) => emits('click', e))
const handleBtnClickThrottle = throttle(hanleBtnClick, props.throttleDuration)


defineExpose<ButtonInstance>({
  ref: _ref,
})
</script>

<template>
<component
 ref="_ref"
 class="i-button"
 :is="tag"
 :autofocus="autofocus"
 :type="tag === 'button' ? nativeType : void 0"
 :disabled="disabled || loading ? true : void 0 "
 :class="{
   [`i-button--${type}`]: type,
   [`i-button--${size}`]: size,
   'is-plain': plain,
    'is-round': round,
    'is-circle': circle,
    'is-disabled': disabled,
    'is-loading': loading,
 }"
 @click="(e:MouseEvent) => useThrottle?handleBtnClickThrottle(e):hanleBtnClick(e)"
>
<template v-if="loading">
  <slot name="loading">
    <i-icon 
    class="loading-icon"
    :icon="loadingIcon ?? 'spinner'"
    :style="iconStyle"
    size="1x"
    spin />
  </slot>
</template>
<i-icon 
v-if="icon && !loading" 
:icon="icon"
:style="iconStyle"
size="1x" />
 <slot></slot>
</component>
</template>

<style scoped>
@import "./style.css";
</style>