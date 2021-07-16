<template>
  <div class="title-bar" @dblclick="toggleTitleBar"></div>
  <router-view/>
</template>
<script>
const { ipcRenderer } = require('electron');

export default {
  methods: {
    toggleTitleBar() {
      ipcRenderer.send('toggle-window-size');
    }
  },
};
</script>
