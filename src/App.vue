<script setup>
import { ref, toRefs } from 'vue'
import { usePopupStore } from './stores/popup'
import { toast } from 'vue3-toastify'

import BuilderElements from './components/popup/BuilderElements.vue'
import PopupView from './components/popup/PopupView.vue'
import HeaderComponent from './components/layout/HeaderComponent.vue'
import PopupResult from './components/popup/PopupResult.vue'
import PreviewModal from './components/ui/PreviewModal.vue'

const popupStore = usePopupStore()
const { formStyles } = toRefs(popupStore)
const { formValues } = toRefs(popupStore)

const showPreviewModal = ref(false)

const showPreview = () => {
  showPreviewModal.value = true
}

const savePopup = () => {
  popupStore.savePopupState()
  toast(`Form saved successfully!`, {
    autoClose: 1000,
    position: toast.POSITION.BOTTOM_RIGHT,
    type: 'success',
    theme: 'colored'
  })
}
</script>

<template>
  <header-component />
  <main class="main">
    <builder-elements @showPreview="showPreview" @savePopup="savePopup" />
    <popup-view />
  </main>

  <teleport to="body">
    <preview-modal :show="showPreviewModal" @close="showPreviewModal = false">
      <popup-result :info="formValues" :style="formStyles" />
    </preview-modal>
  </teleport>
</template>

<style lang="scss" scoped>
.main {
  max-width: 1440px;
  margin: 0 auto;
  padding: 4rem 1rem;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;

  @media only screen and (min-width: 768px) {
    padding: 4rem 2rem;
  }
}
</style>
