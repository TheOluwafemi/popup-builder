<script setup lang="ts">
defineProps({
  show: Boolean
})
</script>

<template>
  <transition name="modal">
    <div v-if="show" class="modal-mask" @click.self="$emit('close')" @keydown.esc="$emit('close')">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">Preview</slot>
        </div>

        <div class="modal-body">
          <slot></slot>
        </div>

        <div class="modal-footer">
          <button class="modal-default-button" @click="$emit('close')">Close</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 100%;
  margin: auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;

  @media only screen and (min-width: 600px) {
    flex: 0 0 80%;
  }

  @media only screen and (min-width: 768px) {
    flex: 0 0 60%;
  }

  @media only screen and (min-width: 1024px) {
    flex: 0 0 50%;
  }
}

.modal-header {
  padding: 1rem;
  border-bottom: 1px solid lightgrey;
  text-align: center;
  margin-top: 0;
  font-size: 20px;
}

.modal-header h3 {
}

.modal-body {
  margin: 2.5rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-footer {
  padding: 1.5rem;
  display: flex;
  justify-content: end;
}

.modal-default-button {
  border: 1px solid lightgrey;
  cursor: pointer;
  border-radius: 4px;
  padding: 0.3rem 1.5rem;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
