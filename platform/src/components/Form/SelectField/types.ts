interface SelectOption {
    title: string,
    id: string|number
    icon?: string
}

type Sizes = 'xs' | 'md' | 'sm' | 'lg' | 'xl' | 'xxl';
type Themes = 'white' | 'primary';
type AngleView = 'primary' | 'secondary';

export {
    SelectOption,
    Sizes,
    Themes,
    AngleView
}
