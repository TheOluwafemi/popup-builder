<script setup lang="ts">
import { toRefs, ref, onBeforeUpdate, onUpdated, reactive, onMounted } from 'vue'
import { usePopupStore } from '../../stores/popup'
import interact from 'interactjs'
import { InteractEvent } from '@interactjs/types'
import StarIcon from '../icons/StarIcon.vue'
import CancelIcon from '../icons/CancelIcon.vue'
import { FormValueItem, FormValuesType } from '../../types/index'

const popupStore = usePopupStore()
const { formStyles } = toRefs(popupStore)
const { formValues } = toRefs(popupStore)

const starDraggable = ref<HTMLElement | null>()
const myDraggable = ref<HTMLElement[] | []>([])

onMounted(() => {
    initInteract(starDraggable.value as HTMLElement)
    initInteract(myDraggable.value)
})

// Make sure to reset the refs before each update.
onBeforeUpdate(() => {
    myDraggable.value = []
})

// then run interact js again
onUpdated(() => {
    initInteract(myDraggable.value)
})

const onDrop = (event: DragEvent) => {
    const item = event.dataTransfer?.getData('item')
    if (item) addFormItem(item)
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

const removeFormItem = (field: FormValueItem) => {
    popupStore.removeField(field)
}

const saveEditableField = (event: FocusEvent, item: FormValueItem) => {
    const { type } = item
    const content = (event.target as HTMLInputElement).innerHTML
    if (content === popupStore.formValues[type as keyof FormValuesType][0].value) return
    popupStore.saveField(content, item)
}

// *** Interaction **
const pos = reactive({
    x: 0,
    y: 0
})

const initInteract = (allRefs: HTMLElement | HTMLElement[]) => {
    if (Array.isArray(allRefs)) {
        allRefs.forEach((selector) => {
            addInteract(selector)
        })
    } else {
        addInteract(allRefs)
    }
}

const addInteract = (selector: HTMLElement) => {
    interact(selector).draggable({
        modifiers: [
            interact.modifiers.restrict({
                restriction: 'parent',
                endOnly: true
            })
        ],
        inertia: {
            resistance: 50,
            minSpeed: 200,
            endSpeed: 100
        },
        maxPerElement: 100,
        autoScroll: false,
        onmove: dragMoveListener,
        onend: onDragEnd
    })
}

const dragMoveListener = (event: InteractEvent) => {
    const target = event.target
    const elementId = event.target.id
    const element = document.getElementById(elementId) as HTMLElement

    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(element.getAttribute('data-x') as string) || pos.x) + event.dx
    const y = (parseFloat(element.getAttribute('data-x') as string) || pos.y) + event.dy

    // translate the element
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the position attributes
    target.setAttribute('data-x', x.toString())
    target.setAttribute('data-y', y.toString())
}

const onDragEnd = (event: DragEvent) => {
    const target = event.target as HTMLElement

    // update property transform for the dragged element
    const [type, id] = target.id.split('_')
    if (type === 'starsColor') {
        popupStore.formStyles[type].transform = target.style.transform
    } else {
        const dragged = popupStore.formValues[type as keyof FormValuesType].filter((item) => item.id === id)
        dragged[0].transform = target.style.transform
    }
}
</script>

<template>
    <section class="popup-wrapper">
        <div class="popup" :style="{ backgroundColor: formStyles.backgroundColor.value }" @drop="onDrop($event)" @dragenter.prevent @dragover.prevent>
            <template v-if="formStyles.starsColor.active === true">
                <div
                    :id="`${formStyles.starsColor.type}_${formStyles.starsColor.id}`"
                    ref="starDraggable"
                    class="stars item"
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
                    :id="`${item.type}_${item.id}`"
                    :key="index"
                    ref="myDraggable"
                    class="title item"
                    :style="{ transform: item.transform ? item.transform : '' }"
                >
                    <h3 contenteditable="true" @blur="saveEditableField($event, item)">{{ item.value }}</h3>
                    <cancel-icon class="cancel-btn" color="red" @cancel="removeFormItem(item)" />
                </div>
            </template>

            <template v-if="formValues.inputFields?.length">
                <div
                    v-for="(item, index) in formValues.inputFields"
                    :id="`${item.type}_${item.id}`"
                    :key="index"
                    ref="myDraggable"
                    class="input-wrapper item"
                    :style="{ transform: item.transform ? item.transform : '' }"
                >
                    <input class="input" :type="item.input" :value="item.value" :placeholder="item.placeholder" />
                    <cancel-icon class="cancel-btn" color="red" @cancel="removeFormItem(item)" />
                </div>
            </template>

            <template v-if="formValues.buttons?.length">
                <div
                    v-for="(item, index) in formValues.buttons"
                    :id="`${item.type}_${item.id}`"
                    :key="index"
                    ref="myDraggable"
                    class="btn-wrapper item"
                    :style="{ transform: item.transform ? item.transform : '' }"
                >
                    <button
                        class="btn"
                        type="submit"
                        contenteditable="true"
                        :style="{
                            backgroundColor: item.background,
                            color: item.color
                        }"
                        @blur="saveEditableField($event, item)"
                    >
                        {{ item.value }}
                    </button>
                    <cancel-icon class="cancel-btn" color="red" @cancel="removeFormItem(item)" />
                </div>
            </template>

            <template v-if="formValues.subtitleFields?.length">
                <div
                    v-for="(item, index) in formValues.subtitleFields"
                    :id="`${item.type}_${item.id}`"
                    :key="index"
                    ref="myDraggable"
                    class="subtitle-wrapper item"
                    :style="{ transform: item.transform ? item.transform : '' }"
                >
                    <small class="subtitle" contenteditable="true" @blur="saveEditableField($event, item)">{{ item.value }}</small>
                    <cancel-icon class="cancel-btn" color="red" @cancel="removeFormItem(item)" />
                </div>
            </template>
        </div>
    </section>
</template>

<style lang="scss" scoped>
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
