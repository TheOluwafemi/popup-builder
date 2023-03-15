import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'
import { FormValueItem, FormStylesType, FormValuesType } from '../types/index'

export const usePopupStore = defineStore('popup', {
    state: () => {
        return {
            formStyles: <FormStylesType>{
                backgroundColor: {
                    id: uuid(),
                    name: 'Background Color',
                    type: 'backgroundColor',
                    active: true,
                    value: '#f44336'
                },

                starsColor: {
                    id: uuid(),
                    name: 'Stars',
                    type: 'starsColor',
                    active: true,
                    value: '#b71c1c'
                }
            },
            formValues: <FormValuesType>{
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
            }
        }
    },

    actions: {
        loadStoredState(type: string, payload: string) {
            if (type === 'formValues') {
                Object.assign(this.formValues, JSON.parse(payload))
            }
            if (type === 'formStyles') {
                Object.assign(this.formStyles, JSON.parse(payload))
            }
        },
        savePopupState() {
            localStorage.setItem('form-values', JSON.stringify(this.formValues))
            localStorage.setItem('form-styles', JSON.stringify(this.formStyles))
        },
        addTitleField() {
            if (!this.formValues['titleFields']) {
                this.formValues['titleFields'] = []
            }
            const newTitle = {
                id: uuid(),
                type: 'titleFields',
                value: 'All the text and elements in this popup should be editable and draggable'
            }
            this.formValues['titleFields'].push(newTitle)
        },

        addInputField() {
            if (!this.formValues['inputFields']) {
                this.formValues['inputFields'] = []
            }
            const newInput: FormValueItem = {
                id: uuid(),
                input: 'email',
                type: 'inputFields',
                value: '',
                placeholder: 'Enter your email'
            }
            this.formValues.inputFields.push(newInput)
        },

        addButtonField() {
            if (!this.formValues['buttons']) {
                this.formValues['buttons'] = []
            }
            const newButton = {
                id: uuid(),
                type: 'buttons',
                input: '',
                value: 'signup now',
                background: '#000000',
                color: '#ffffff'
            }
            this.formValues.buttons.push(newButton)
        },

        addSubtitleField() {
            if (!this.formValues['subtitleFields']) {
                this.formValues['subtitleFields'] = []
            }
            const newSubtitle = {
                id: uuid(),
                type: 'subtitleFields',
                value: 'No credit card required. No Surprises'
            }
            this.formValues.subtitleFields.push(newSubtitle)
        },

        removeField(field: FormValueItem) {
            const { type } = field
            const remainder = this.formValues[type as keyof FormValuesType].filter((item) => {
                return item['id'] !== field.id
            })
            this.formValues[type as keyof FormValuesType] = remainder
        },

        saveField(content: string, item: FormValueItem) {
            const { type } = item
            this.formValues[type as keyof FormValuesType][0].value = content
        }
    }
})
