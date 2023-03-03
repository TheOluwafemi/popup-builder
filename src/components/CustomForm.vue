<template>
  <form class="form" @drop="onDrop($event, item)" @dragenter.prevent @dragover.prevent>
    <template v-if="formValues.backgroundColor?.length">
      <div v-for="(field, index) in formValues.backgroundColor" :key="index" class="form-field">
        <label class="form-label" for="bg-color">{{ field.name }}</label>
        <input type="color" class="form-input" name="bg-color" v-model="field.value" />

        <div class="remove">
          <span class="material-symbols-sharp" @click="removeField(field.id)"> delete </span>
        </div>
      </div>
    </template>

    <template v-if="formValues.starsColor?.length">
      <div v-for="(field, index) in formValues.starsColor" :key="index" class="form-field">
        <label class="form-label" for="stars-color">{{ field.name }}</label>
        <input type="color" class="form-input" name="stars-color" v-model="field.value" />

        <div class="remove">
          <span class="material-symbols-sharp" @click="removeField(field.id)"> delete </span>
        </div>
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

        <div class="remove">
          <span class="material-symbols-sharp" @click="removeField(field.id)"> delete </span>
        </div>
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

        <div class="remove">
          <span class="material-symbols-sharp" @click="removeField(field.id)"> delete </span>
        </div>
      </div>
    </template>

    <template v-if="formValues.inputFields?.length">
      <div v-for="(field, index) in formValues.inputFields" :key="index" class="form-field">
        <label class="form-label" for="field.name">{{ field.name }}</label>
        <select class="form-select" :name="field.name" :id="field.name" v-model="field.type">
          <option value="" disabled>Select input type</option>
          <option value="text">Text</option>
          <option value="email">Email</option>
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

        <div class="remove">
          <span class="material-symbols-sharp" @click="removeField(field.id)"> delete </span>
        </div>
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

        <div class="remove">
          <span class="material-symbols-sharp" @click="removeField(field.id)"> delete </span>
        </div>
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
</template>

<style lang="scss" scoped>
.form {
  flex: 0 0 100%;
  border-radius: 4px;
  min-height: 20rem;
  background: #fafafa;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 1rem;
  width: 100%;

  @media only screen and (min-width: 600px) {
    flex: 0 0 55%;
  }

  @media only screen and (min-width: 1024px) {
    flex: 0 0 56%;
  }

  &-field {
    width: 100%;
    margin: 0.7rem 0;
    background: white;
    padding: 1rem 1rem;
    border: 1.5px dashed lightgrey;
    border-radius: 8px;
    position: relative;

    .remove {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      cursor: pointer;
    }
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
      background: transparent;
      color: #111;
      border: none;
    }

    &-primary {
      background: #3f51b5;
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
</style>
