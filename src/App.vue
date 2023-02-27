<script setup>
import PopupForm from "./components/PopupForm.vue"
import { reactive } from 'vue'

const name = reactive({
  value: 'damilola'
})
</script>

<template>
  <header>
    <div class="wrapper"></div>
  </header>

  <main>
    <popup-form/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
