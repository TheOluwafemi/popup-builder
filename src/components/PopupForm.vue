<script setup>
import { reactive, onMounted, ref } from 'vue'
import { v4 as uuid } from 'uuid'
import AddCircle from './icons/AddCircle.vue'
import PreviewModal from './PreviewModal.vue'
import { toast } from 'vue3-toastify'

onMounted(() => {
  const storedData = localStorage.getItem('form-values')
  if (storedData) {
    Object.assign(formValues, JSON.parse(storedData))
  }
})

const showPreviewModal = ref(false)
const formElements = {
  value: [
    { name: 'Background Color', type: 'backgroundColor' },
    { name: 'Stars', type: 'starsColor' },
    { name: 'Button Field', type: 'buttonField' },
    { name: 'Title Field', type: 'titleField' },
    { name: 'Subtitle Field', type: 'subtitleField' },
    { name: 'Input Field', type: 'inputField' }
  ]
}

let formValues = reactive({})

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
    case 'backgroundColor':
      addBackgroundColor()
      break
    case 'starsColor':
      addStarsColor()
      break
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
      console.log('Please try again...')
      break
  }
}

const addButtonField = () => {
  if (formValues.buttons?.length) {
    refuseSameElementError('button element')
  }
  formValues['buttons'] = []
  const newButton = {
    id: uuid(),
    name: 'button',
    type: '',
    text: 'signup now',
    background: '#000000',
    color: '#ffffff'
  }
  formValues.buttons.push(newButton)
}

function addBackgroundColor() {
  if (formValues.backgroundColor?.length) {
    refuseSameElementError('background color element')
    return
  }
  formValues['backgroundColor'] = []
  const newColor = { id: uuid(), name: 'background color', value: '#f44336' }
  formValues.backgroundColor.push(newColor)
}

const addStarsColor = () => {
  if (formValues.starsColor?.length) {
    refuseSameElementError('star element')
    return
  }
  formValues['starsColor'] = []
  const newStar = { id: uuid(), name: 'stars color', value: '#b71c1c' }
  formValues.starsColor.push(newStar)
}

const addTitleField = () => {
  if (formValues.titleFields?.length) {
    refuseSameElementError('title field')
    return
  }
  formValues['titleFields'] = []
  const newTitle = {
    id: uuid(),
    name: 'title field',
    value: 'All the text and elements in this popup should be editable and draggable'
  }
  formValues.titleFields.push(newTitle)
}

const addSubtitleField = () => {
  if (formValues.subtitleFields?.length) {
    refuseSameElementError('subtitle field')
    return
  }
  formValues['subtitleFields'] = []
  const newSubtitle = {
    id: uuid(),
    name: 'subtitle field',
    value: 'No credit card required. No Surprises'
  }
  formValues.subtitleFields.push(newSubtitle)
}

const addInputField = () => {
  if (formValues.inputFields?.length) {
    refuseSameElementError('input field')
    return
  }
  formValues['inputFields'] = []
  const newInput = {
    name: 'popup-input',
    type: 'email',
    value: '',
    placeholder: 'Enter your email'
  }
  formValues.inputFields.push(newInput)
}

const saveForm = () => {
  localStorage.setItem('form-values', JSON.stringify(formValues))
}

const showPreview = () => {
  showPreviewModal.value = true
}

const resetForm = () => {
  Object.assign(formValues, {})
  localStorage.removeItem('form-values')
  console.log(formValues)
}

const refuseSameElementError = (element) => {
  toast(`Oops, you already have ${element} in the form!`, {
    autoClose: 1000,
    position: toast.POSITION.BOTTOM_RIGHT,
    type: 'error',
    theme: 'colored'
  })
}
</script>

<template>
  <section class="builder">
    <div class="list-wrapper">
      <div class="title">
        <h3>Elements</h3>
        <small class="desc"
          >You can add elements to the form by clicking on any elements or by dragging the element
          into the form</small
        >
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
          <add-circle />
        </li>
      </ul>
    </div>

    <form class="form" @drop="onDrop($event, item)" @dragenter.prevent @dragover.prevent>
      <div v-if="Object.keys(formValues).length">
        <small @click.prevent="resetForm">Reset Form</small>
      </div>
      <template v-if="formValues.backgroundColor?.length">
        <div v-for="(field, index) in formValues.backgroundColor" :key="index" class="form-field">
          <label class="form-label" for="bg-color">{{ field.name }}</label>
          <input type="color" class="form-input" name="bg-color" v-model="field.value" />
        </div>
      </template>

      <template v-if="formValues.starsColor?.length">
        <div v-for="(field, index) in formValues.starsColor" :key="index" class="form-field">
          <label class="form-label" for="stars-color">{{ field.name }}</label>
          <input type="color" class="form-input" name="stars-color" v-model="field.value" />
        </div>
      </template>

      <template v-if="formValues.titleFields?.length">
        <div v-for="(field, index) in formValues.titleFields" :key="index" class="form-field">
          <label class="form-label" for="field.name">{{ field.name }}</label>
          <input
            type="text"
            class="form-input"
            :name="field.name"
            v-model="field.value"
            placeholder="Enter popup title"
          />
        </div>
      </template>

      <template v-if="formValues.subtitleFields?.length">
        <div v-for="(field, index) in formValues.subtitleFields" :key="index" class="form-field">
          <label class="form-label" for="field.name">{{ field.name }}</label>
          <input
            type="text"
            class="form-input"
            :name="field.name"
            v-model="field.value"
            placeholder="Enter popup subtitle"
          />
        </div>
      </template>

      <template v-if="formValues.inputFields?.length">
        <div v-for="(field, index) in formValues.inputFields" :key="index" class="form-field">
          <label class="form-label" for="field.name">{{ field.name }}</label>
          <select class="form-select" :name="field.name" :id="field.name" v-model="field.type">
            <option value="" disabled>Select input type</option>
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="select">Select-Options</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
          </select>
          <input
            type="text"
            class="form-input"
            :name="field.name"
            v-model="field.value"
            :placeholder="`Enter a value`"
          />
          <input
            type="text"
            class="form-input"
            :name="field.name"
            v-model="field.placeholder"
            :placeholder="`Enter input placeholder`"
          />
        </div>
      </template>

      <template v-if="formValues.buttons?.length">
        <div v-for="(field, index) in formValues.buttons" :key="index" class="form-field">
          <label class="form-label" for="field.name">{{ field.name }}</label>
          <input
            type="text"
            class="form-input"
            :name="field.name"
            v-model="field.text"
            :placeholder="`Enter a ${field.name} text`"
          />
          <label class="form-label label-sm">Background color</label>
          <input type="color" class="form-input" :name="field.name" v-model="field.background" />

          <label class="form-label label-sm">Text color</label>
          <input type="color" class="form-input" :name="field.name" v-model="field.color" />
        </div>
      </template>

      <div v-if="Object.keys(formValues).length" class="btn-group">
        <button class="btn btn-secondary" @click.prevent="showPreview">Preview</button>
        <button class="btn btn-primary" @click.prevent="saveForm">Save</button>
      </div>

      <div v-else class="empty">
        <div class="empty-content">
          <add-circle class="add-icon" :height="48" :width="48" :color="'#bdbdbd'" />
          <p class="empty-text">Build your popup by adding elements from the elements list</p>
        </div>
      </div>
    </form>

    <teleport to="body">
      <preview-modal
        :show="showPreviewModal"
        :popup-info="formValues"
        @close="showPreviewModal = false"
      />
    </teleport>
  </section>
</template>

<style lang="scss" scoped>
.builder {
  display: flex;
  justify-content: space-evenly;
  gap: 2rem;
  align-items: flex-start;
}
.form {
  flex: 0 0 50%;
  min-height: 20rem;
  background: #fafafa;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 2rem 1rem;
  width: 100%;

  &-field {
    width: 100%;
    margin: 1rem 0;
    background: white;
    padding: 0.5rem 1rem;
    border: 1px solid lightgrey;
    border-radius: 8px;
  }

  &-label {
    display: block;
    text-transform: capitalize;
    font-size: 13px;
    margin-bottom: 0.5rem;
  }

  .label-sm {
    font-size: 11px;
  }

  &-input,
  &-select {
    margin-bottom: 1rem;
    width: 100%;
    padding: 0.5rem 0.7rem;
    border-radius: 4px;
    outline: none;
    border: 1px solid grey;
    font-size: 14px;

    &[type='color'] {
      width: 4rem;
      -webkit-appearance: none;
      border: none;
      height: 3rem;
    }
  }

  .btn-group {
    display: flex;
    gap: 1.5rem;
  }

  .btn {
    outline: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;

    &-secondary {
      // background: #3f51b5;
      background: transparent;
      color: #111;
      // border: 1px solid #3f51b5;
      border: none;
    }

    &-primary {
      background: #3f51b5;
      // background: #009688;
      color: white;
      border: 1px solid #3f51b5;
    }
  }

  .empty {
    width: 100%;
    height: 100%;

    &-content {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      flex-direction: column;
      margin-top: 2rem;
      height: 100%;

      .add-icon {
        margin: 1rem 0;
      }

      .empty-text {
        color: #9e9e9e;
      }
    }
  }
}

.list-wrapper {
  flex: 0 0 30%;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

  .title {
    padding: 1rem;
    border-bottom: 1px solid lightgrey;
    color: darkblue;
    font-weight: bold;
    .desc {
      display: block;
    }
  }

  .list {
    padding: 0rem;
    list-style-type: none;
    border-radius: 0px;

    &-item {
      padding: 1rem;
      border-bottom: 1px solid lightgrey;
      cursor: pointer;
      text-transform: capitalize;
      font-weight: 500;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:last-of-type {
        border-bottom: 0;
      }
    }
  }
}
</style>
