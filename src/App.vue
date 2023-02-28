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
  max-width: 1440px;
  padding: 4rem 1rem;
  width: 100%;

  @media only screen and (min-width: 768px) {
    padding: 4rem 2rem;
  }
}
</style>
