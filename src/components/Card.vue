<template>
  <div class="card">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String
  }
}
</script>
