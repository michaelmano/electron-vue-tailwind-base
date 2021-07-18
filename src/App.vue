<template>
  <div class="title-bar" @dblclick="toggleTitleBar"></div>
  <div class="flex">
    <aside class="sidebar" ref="sidebar">
      <div class="sidebar__resizer" @mousedown="initResize"></div>
      <ul>
        <li>Sidebar item</li>
        <li>Sidebar item</li>
        <li>Sidebar item</li>
        <li>Sidebar item</li>
        <li>Sidebar item</li>
        <li>Sidebar item</li>
      </ul>
    </aside>
    <div class="w-auto w-full">
      <router-view/>
    </div>
  </div>
</template>
<script>
const { ipcRenderer } = require('electron');

export default {
  methods: {
    toggleTitleBar() {
      ipcRenderer.send('toggle-window-size');
    },
    initResize() {
      window.addEventListener('mousemove', this.resize, false);
      window.addEventListener('mouseup', this.stopResize, false);
    },
    resize(event) {
      this.$refs.sidebar.style.width = event.clientX + 'px';
    },
    stopResize() {
      window.removeEventListener('mousemove', this.resize, false);
      window.removeEventListener('mouseup', this.stopResize, false);
    },
  },
};
</script>
