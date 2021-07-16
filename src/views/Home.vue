<template>
  <div class="flex h-screen items-center justify-center">
    <svg-vue class="text-purple-500 w-24" />
  </div>
</template>

<script>
import SvgVue from '@/assets/icons/vue.svg';

export default {
  name: 'Home',
  components: {
    SvgVue,
  },
}
</script>
