<script setup lang="ts">
import { toRefs } from 'vue'
import { usePopupStore } from '../../stores/popup'
import { FormElementObject, FormValueItem } from '../../types/index'

const FORM_ELEMENTS: FormElementObject[] = [
    { name: 'Button Field', type: 'buttonField' },
    { name: 'Title Field', type: 'titleField' },
    { name: 'Subtitle Field', type: 'subtitleField' },
    { name: 'Input Field', type: 'inputField' }
]

const popupStore = usePopupStore()
const { formStyles } = toRefs(popupStore)

const startDrag = (event: DragEvent, item: string) => {
    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('item', item)
    }
}

const addFormItem = (item: string) => {
    switch (item) {
        case 'buttonField':
            popupStore.addButtonField()
            break
        case 'inputField':
            popupStore.addInputField()
            break
        case 'titleField':
            popupStore.addTitleField()
            break
        case 'subtitleField':
            popupStore.addSubtitleField()
            break
        default:
            break
    }
}
</script>

<template>
    <div class="list-wrapper">
        <div class="list-one">
            <div class="title">
                <h3>Elements</h3>
                <p class="desc">
                    You can add elements to the form by clicking on any elements or by dragging the element into the form. Text content in the popup
                    are editable.
                </p>
            </div>

            <ul class="list">
                <li
                    v-for="(item, index) in FORM_ELEMENTS"
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
                            >Active: <input type="checkbox" :value="item.active" v-model="item.active" :disabled="item.type === 'backgroundColor'"
                        /></label>
                        <input type="color" v-model="item.value" />
                    </form>
                </li>
            </ul>
        </div>

        <div class="buttons">
            <button type="button" class="btn" @click.prevent="$emit('show-preview')">Preview</button>
            <button type="button" class="btn btn-primary" @click.prevent="$emit('save-popup')">Save</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
</style>
