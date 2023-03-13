<script setup>
import { reactive, onMounted, ref } from 'vue'
import StarIcon from './icons/StarIcon.vue'
import CancelIcon from './icons/CancelIcon.vue'
import PreviewModal from './PreviewModal.vue'
import PopupResult from './PopupResult.vue'
import { toast } from 'vue3-toastify'
import { v4 as uuid } from 'uuid'
import interact from 'interactjs'

onMounted(() => {
  loadLocalStore()
  initInteract(starDraggable.value)
  initInteract(myDraggable.value)
})

const loadLocalStore = () => {
  // check the local storage for saved items
  const storedInfo = localStorage.getItem('form-values')
  const storedStyles = localStorage.getItem('form-styles')
  if (storedInfo) {
    Object.assign(formValues, JSON.parse(storedInfo))
  }
  if (storedStyles) {
    Object.assign(formStyles, JSON.parse(storedStyles))
  }
}

// to display list of elements, not reactive
const formElements = {
  value: [
    { name: 'Button Field', type: 'buttonField' },
    { name: 'Title Field', type: 'titleField' },
    { name: 'Subtitle Field', type: 'subtitleField' },
    { name: 'Input Field', type: 'inputField' }
  ]
}

// to display and hold styles - reactive
const formStyles = reactive({
  backgroundColor: {
    id: uuid(),
    name: 'Background Color',
    type: 'backgroundColor',
    active: true,
    value: '#f44336'
  },
  starsColor: { id: uuid(), name: 'Stars', type: 'starsColor', active: true, value: '#b71c1c' }
})

// to display and hold form elements - reactive
let formValues = reactive({
  buttons: [
    {
      id: uuid(),
      type: 'buttons',
      input: '',
      value: 'signup now',
      background: '#000000',
      color: '#ffffff'
    }
  ],
  inputFields: [
    {
      id: uuid(),
      input: 'email',
      type: 'inputFields',
      value: '',
      placeholder: 'Enter your email'
    }
  ],
  titleFields: [
    {
      id: uuid(),
      type: 'titleFields',
      value: 'All the text and elements in this popup should be editable and draggable'
    }
  ],
  subtitleFields: [
    {
      id: uuid(),
      type: 'subtitleFields',
      value: 'No credit card required. No Surprises'
    }
  ]
})

const startDrag = (event, item) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('item', item)
}

const onDrop = (event) => {
  const item = event.dataTransfer.getData('item')
  addFormItem(item)
}

const addFormItem = (item) => {
  switch (item) {
    case 'buttonField':
      addButtonField()
      break
    case 'inputField':
      addInputField()
      break
    case 'titleField':
      addTitleField()
      break
    case 'subtitleField':
      addSubtitleField()
      break
    default:
      break
  }
}

const addTitleField = () => {
  if (!formValues['titleFields']) {
    formValues['titleFields'] = []
  }
  const newTitle = {
    id: uuid(),
    type: 'titleFields',
    value: 'All the text and elements in this popup should be editable and draggable',
    posX: 0,
    posY: 0
  }
  formValues['titleFields'].push(newTitle)
}

const addInputField = () => {
  if (!formValues['inputFields']) {
    formValues['inputFields'] = []
  }
  const newInput = {
    id: uuid(),
    input: 'email',
    type: 'inputFields',
    value: '',
    placeholder: 'Enter your email'
  }
  formValues.inputFields.push(newInput)
}

const addButtonField = () => {
  if (!formValues['buttons']) {
    formValues['buttons'] = []
  }
  const newButton = {
    id: uuid(),
    type: 'buttons',
    input: '',
    value: 'signup now',
    background: '#000000',
    color: '#ffffff'
  }
  formValues.buttons.push(newButton)
}

const addSubtitleField = () => {
  if (!formValues['subtitleFields']) {
    formValues['subtitleFields'] = []
  }
  const newSubtitle = {
    id: uuid(),
    type: 'subtitleFields',
    value: 'No credit card required. No Surprises'
  }
  formValues.subtitleFields.push(newSubtitle)
}

const saveForm = () => {
  localStorage.setItem('form-values', JSON.stringify(formValues))
  localStorage.setItem('form-styles', JSON.stringify(formStyles))
  toast(`Form saved successfully!`, {
    autoClose: 1000,
    position: toast.POSITION.BOTTOM_RIGHT,
    type: 'success',
    theme: 'colored'
  })
}

const showPreviewModal = ref(false)
const showPreview = () => {
  showPreviewModal.value = true
}

const removeField = (field) => {
  const remainder = formValues[field.type].filter((item) => {
    return item.id !== field.id
  })
  formValues[field.type] = remainder
  const storedData = localStorage.getItem('form-values')
  if (storedData) {
    localStorage.setItem('form-values', JSON.stringify(formValues))
  }
}

const saveField = (event, item) => {
  const content = event.target.innerHTML
  if (content === formValues[item.type][0].value) return
  formValues[item.type][0].value = content
}

// *** Interaction **
const starDraggable = ref(null)
const myDraggable = ref([])
const pos = reactive({
  x: 0,
  y: 0
})

const initInteract = (allRefs) => {
  if (Array.isArray(allRefs)) {
    allRefs.forEach((selector) => {
      addInteract(selector)
    })
  } else {
    addInteract(allRefs)
  }
}

const addInteract = (selector) => {
  interact(selector).draggable({
    inertia: true,
    restrict: {
      restriction: 'parent',
      endOnly: true
    },
    autoScroll: true,
    onmove: dragMoveListener,
    onend: onDragEnd
  })
}

const dragMoveListener = (event) => {
  const target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || pos.x) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || pos.y) + event.dy

  // translate the element
  target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

const onDragEnd = (event) => {
  const target = event.target

  // update property transform for the dragged element
  const [type, id] = target.id.split('_')
  if (type === 'starsColor') {
    formStyles[type].transform = target.style.transform
  } else {
    const dragged = formValues[type].filter((item) => item.id === id)
    dragged[0].transform = target.style.transform
    console.log(dragged)
  }
}
</script>

<template>
  <section class="builder">
    <div class="list-wrapper">
      <div class="list-one">
        <div class="title">
          <h3>Elements</h3>
          <p class="desc">
            You can add elements to the form by clicking on any elements or by dragging the element
            into the form. Text content in the popup are editable.
          </p>
        </div>

        <ul class="list">
          <li
            v-for="(item, index) in formElements.value"
            :key="index"
            class="list-item"
            draggable="true"
            @click="addFormItem(item.type)"
            @dragstart="startDrag($event, item.type)"
          >
            <p>{{ item.name }}</p>
            <span
              class="material-symbols-sharp"
              style="
                 {
                  cursor: 'move';
                }
              "
            >
              drag_indicator
            </span>
          </li>
        </ul>
      </div>

      <div class="list-two">
        <div class="title">
          <h3>Styles</h3>
          <p class="desc">Change the appearance of the popup</p>
        </div>

        <ul class="list">
          <li v-for="(item, index) in formStyles" :key="index" class="list-item">
            <div class="list-item-title">
              <p>{{ item.name }}</p>
              <span class="material-symbols-sharp"> format_color_fill </span>
            </div>

            <form class="list-item-form">
              <label :for="item.type"
                >Active:
                <input
                  type="checkbox"
                  :value="item.active"
                  v-model="item.active"
                  :disabled="item.type === 'backgroundColor'"
              /></label>
              <input type="color" v-model="item.value" />
            </form>
          </li>
        </ul>
      </div>

      <div class="buttons">
        <button type="button" class="btn" @click.prevent="showPreview">Preview</button>
        <button type="button" class="btn btn-primary" @click.prevent="saveForm">Save</button>
      </div>
    </div>

    <section class="popup-wrapper">
      <div
        class="popup"
        :style="{ backgroundColor: formStyles.backgroundColor.value }"
        @drop="onDrop($event, item)"
        @dragenter.prevent
        @dragover.prevent
      >
        <template v-if="formStyles.starsColor.active === true">
          <div
            class="stars item"
            ref="starDraggable"
            :id="`${formStyles.starsColor.type}_${formStyles.starsColor.id}`"
            :style="{
              transform: formStyles.starsColor.transform ? formStyles.starsColor.transform : ''
            }"
          >
            <star-icon :height="20" :width="20" :color="formStyles.starsColor.value" />
            <star-icon :height="28" :width="28" :color="formStyles.starsColor.value" />
            <star-icon :height="20" :width="20" :color="formStyles.starsColor.value" />
          </div>
        </template>

        <template v-if="formValues.titleFields?.length">
          <div
            v-for="(item, index) in formValues.titleFields"
            :key="index"
            ref="myDraggable"
            :id="`${item.type}_${item.id}`"
            class="title item"
            :style="{ transform: item.transform ? item.transform : '' }"
          >
            <h3 @blur="saveField($event, item)" contenteditable="true">{{ item.value }}</h3>
            <cancel-icon class="cancel-btn" color="red" @cancel="removeField(item)" />
          </div>
        </template>

        <template v-if="formValues.inputFields?.length">
          <div
            v-for="(item, index) in formValues.inputFields"
            :key="index"
            class="input-wrapper item"
            ref="myDraggable"
            :id="`${item.type}_${item.id}`"
            :style="{ transform: item.transform ? item.transform : '' }"
          >
            <input
              class="input"
              :type="item.input"
              :value="item.value"
              :placeholder="item.placeholder"
            />
            <cancel-icon class="cancel-btn" color="red" @cancel="removeField(item)" />
          </div>
        </template>

        <template v-if="formValues.buttons?.length">
          <div
            v-for="(item, index) in formValues.buttons"
            :key="index"
            ref="myDraggable"
            class="btn-wrapper item"
            :id="`${item.type}_${item.id}`"
            :style="{ transform: item.transform ? item.transform : '' }"
          >
            <button
              class="btn"
              :type="item.input"
              contenteditable="true"
              @blur="saveField($event, item)"
              :style="{
                backgroundColor: item.background,
                color: item.color
              }"
            >
              {{ item.value }}
            </button>
            <cancel-icon class="cancel-btn" color="red" @cancel="removeField(item)" />
          </div>
        </template>

        <template v-if="formValues.subtitleFields?.length">
          <div
            v-for="(item, index) in formValues.subtitleFields"
            :key="index"
            :ref="(el) => myDraggable.push(el)"
            class="subtitle-wrapper item"
            :id="`${item.type}_${item.id}`"
            :style="{ transform: item.transform ? item.transform : '' }"
          >
            <small class="subtitle">{{ item.value }}</small>
            <cancel-icon class="cancel-btn" color="red" @cancel="removeField(item)" />
          </div>
        </template>
      </div>
    </section>

    <teleport to="body">
      <preview-modal :show="showPreviewModal" @close="showPreviewModal = false">
        <popup-result :info="formValues" :style="formStyles" />
      </preview-modal>
    </teleport>
  </section>
</template>

<style lang="scss" scoped>
.builder {
  display: flex;
  justify-content: space-evenly;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}

.list-wrapper {
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media only screen and (min-width: 600px) {
    flex: 0 0 40%;
  }

  @media only screen and (min-width: 1024px) {
    flex: 0 0 40%;
  }
  .title {
    color: #673ab7;

    h3 {
      font-weight: bold;
      font-size: 18px;
    }
    .desc {
      display: block;
    }
  }

  .list {
    padding: 0rem;
    list-style-type: none;
    border-radius: 0px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1.5rem;
    grid-auto-rows: 1fr;
    row-gap: 1rem;

    &-item {
      margin-top: 1rem;
      padding: 1rem;
      border: 1px solid #eeeeee;
      border-radius: 8px;
      cursor: pointer;
      text-transform: capitalize;
      font-weight: 500;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
  }

  .list-two {
    .list-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: stretch;
      row-gap: 1.5rem;

      &-title,
      &-form {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .buttons {
    display: flex;
    gap: 1.5rem;
  }
}

.btn {
  padding: 0.3rem 1.5rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &-primary {
    background: #673ab7;
    color: white;
  }
}

.popup-wrapper {
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media only screen and (min-width: 600px) {
    flex: 0 0 55%;
  }

  @media only screen and (min-width: 1024px) {
    flex: 0 0 56%;
  }

  .popup {
    height: 320px;
    width: 320px;
    overflow: hidden;
    position: relative;
    background-color: #f44336;
    border-radius: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    padding: 0.5rem 0.5rem;
    word-wrap: break-word;
    gap: 0.5rem;

    @media only screen and (min-width: 1024px) {
      height: 360px;
      width: 360px;
      gap: 1rem;
    }

    .stars {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 0.5rem;
    }

    .title {
      width: 80%;
      color: white;
      word-wrap: break-word;
      text-align: center;
      font-weight: bold;

      h3 {
        font-weight: bold;
        font-size: 14px;
      }
    }
    .input-wrapper {
      width: 80%;
      // padding: .5rem;
      // margin-top: 1rem;

      .input {
        width: 100%;
        padding: 0.5rem 0.7rem;
        border-radius: 8px;
        outline: none;
        border: 1px solid grey;
        font-size: 14px;
      }
    }

    .btn-wrapper {
      width: 80%;
      // margin-top: 1rem;
      // padding: .5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .btn {
        width: 100%;
        outline: none;
        border-radius: 8px;
        padding: 0.6rem 1rem;
        cursor: pointer;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 2px;
      }
    }

    .subtitle-wrapper {
      width: 70%;
      // padding: .5rem;
      // margin-top: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .subtitle {
        text-align: center;
        width: 100%;
        color: white;
      }
    }

    .item {
      // border: 2px solid #424242;
      // border-radius: 4px;
      padding: 0.3rem;
      position: relative;

      .cancel-btn {
        position: absolute;
        top: -10%;
        right: -5%;
      }
    }
  }
}

[contenteditable] {
  &:hover {
    cursor: pointer;
  }

  &:focus {
    cursor: text;
  }
}
</style>
