interface IItem {
    name: string
    id: number
    items: IItem[]
}

interface INormalizedItem extends IItem {
    isHovered: boolean
}

export {
    IItem,
    INormalizedItem
}
