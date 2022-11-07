interface SelectOption {
    title: string,
    id: string|number
    icon?: string
}

type Sizes = 'xs' | 'md' | 'sm' | 'lg' | 'xl' | 'xxl';
type AngleView = 'primary' | 'secondary';

export {
    SelectOption,
    Sizes,
    AngleView
}
