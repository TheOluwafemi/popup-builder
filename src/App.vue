<script setup>
import PopupForm from './components/PopupForm.vue'
import HeaderComponent from './components/HeaderComponent.vue'
</script>

<template>
  <header-component />
  <main class="main">
    <popup-form />
  </main>
</template>

<style lang="scss" scoped>
.main {
  padding: 4rem 2rem;
  width: 100%;
}
</style>
