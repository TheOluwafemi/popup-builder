export type FormElementObject = {
    name: string
    type: string
}

export type FormValueItem = {
    background?: string
    color?: string
    id: string
    type: string
    input?: string
    value: string
    placeholder?: string
    transform?: string
}

export type FormStyleItem = {
    id: string
    name: string
    type: string
    active?: boolean
    value: string
    transform?: string
}

export type FormValuesType = {
    buttons: [FormValueItem] | FormValueItem[]
    inputFields: [FormValueItem] | FormValueItem[]
    titleFields: [FormValueItem] | FormValueItem[]
    subtitleFields: [FormValueItem] | FormValueItem[]
}

export type FormStylesType = {
    backgroundColor: FormStyleItem
    starsColor: FormStyleItem
}
