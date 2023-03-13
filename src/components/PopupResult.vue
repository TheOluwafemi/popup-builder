<script setup>
import StarIcon from './icons/StarIcon.vue'

const props = defineProps(['info', 'style'])

const otherStyles = {
  '--outlineColor': props.style ? props.style.backgroundColor.value : '#f44336'
}
</script>

<template>
  <section
    class="popup"
    :style="[
      otherStyles,
      {
        backgroundColor: style.backgroundColor ? style.backgroundColor.value : '#f44336'
      }
    ]"
  >
    <template v-if="style.starsColor.active">
      <div class="stars" :style="{ transform: style.starsColor.transform }">
        <star-icon :height="24" :width="24" :color="style.starsColor.value" />
        <star-icon :height="32" :width="32" :color="style.starsColor.value" />
        <star-icon :height="24" :width="24" :color="style.starsColor.value" />
      </div>
    </template>

    <template v-if="info.titleFields?.length">
      <div
        v-for="(item, index) in info.titleFields"
        :key="index"
        class="title"
        :style="{ transform: item.transform }"
      >
        <h3>{{ item.value }}</h3>
      </div>
    </template>

    <template v-if="info.inputFields?.length">
      <input
        v-for="(item, index) in info.inputFields"
        :key="index"
        class="input"
        :type="item.type"
        :value="item.value"
        :placeholder="item.placeholder"
        :style="{ transform: item.transform }"
      />
    </template>

    <template v-if="info.buttons?.length">
      <button
        v-for="(item, index) in info.buttons"
        :key="index"
        class="btn"
        :style="{ backgroundColor: item.background, color: item.color, transform: item.transform }"
      >
        {{ item.value }}
      </button>
    </template>

    <template v-if="info.subtitleFields?.length">
      <small
        v-for="(item, index) in info.subtitleFields"
        :key="index"
        class="subtitle"
        :style="{ transform: item.transform }"
        >{{ item.value }}</small
      >
    </template>
  </section>
</template>

<style lang="scss" scoped>
.popup {
  width: 320px;
  height: 320px;
  border-radius: 100%;
  border: 4px solid white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.5rem 0.5rem;
  word-wrap: break-word;
  gap: 0.5rem;

  @media only screen and (min-width: 1024px) {
    height: 360px;
    width: 360px;
    gap: 1rem;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: -10px;
    bottom: -10px;
    left: -10px;
    right: -10px;
    border-radius: 100%;
    border: 6px solid var(--outlineColor);
  }

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
