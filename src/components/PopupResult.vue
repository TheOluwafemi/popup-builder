<script setup>
import StarIcon from './icons/StarIcon.vue'

defineProps(['details'])
</script>

<template>
  <section
    class="popup"
    :style="{
      backgroundColor: details.backgroundColor?.length
        ? details.backgroundColor[0].value
        : '#f44336',
      outline: `6px solid ${
        details.backgroundColor?.length ? details.backgroundColor[0].value : '#f44336'
      }`
    }"
  >
    <template v-if="details.starsColor?.length">
      <div class="stars">
        <star-icon :height="24" :width="24" :color="details.starsColor[0].value" />
        <star-icon :height="32" :width="32" :color="details.starsColor[0].value" />
        <star-icon :height="24" :width="24" :color="details.starsColor[0].value" />
      </div>
    </template>

    <template v-if="details.titleFields?.length">
      <div class="title">
        <h3 contenteditable="true">{{ details.titleFields[0].value }}</h3>
      </div>
    </template>

    <template v-if="details.inputFields?.length">
      <input
        class="input"
        :type="details.inputFields[0].type"
        :value="details.inputFields[0].value"
        :placeholder="details.inputFields[0].placeholder"
      />
    </template>

    <template v-if="details.buttons?.length">
      <button
        class="btn"
        contenteditable="true"
        :style="{ backgroundColor: details.buttons[0].background, color: details.buttons[0].color }"
      >
        {{ details.buttons[0].text }}
      </button>
    </template>

    <template v-if="details.subtitleFields?.length">
      <small class="subtitle" contenteditable="true">{{ details.subtitleFields[0].value }}</small>
    </template>
  </section>
</template>

<style lang="scss" scoped>
.popup {
  width: 320px;
  height: 320px;
  background-color: tomato;
  border-radius: 100%;
  border: 4px solid white;
  outline: 6px solid tomato;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.5rem 0.5rem;
  word-wrap: break-word;
  gap: 0.5rem;

  .stars {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 0.8rem;
  }

  .title {
    width: 90%;
    color: white;
    word-wrap: break-word;
    text-align: center;
    font-weight: bold;

    h3 {
      font-weight: bold;
      font-size: 14px;
    }
  }

  .input {
    margin-top: 1rem;
    width: 80%;
    padding: 0.5rem 0.7rem;
    border-radius: 8px;
    outline: none;
    border: 1px solid grey;
    font-size: 14px;
  }

  .btn {
    width: 80%;
    outline: none;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 2px;
  }

  .subtitle {
    text-align: center;
    width: 70%;
    color: white;
  }
}
</style>
