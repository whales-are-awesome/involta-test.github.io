import { Icons } from '@/models/icons';

const enum Themes {
    Gray = 'gray',
    Surface = 'surface',
    Primary = 'primary',
}

const enum Sizes {
    Lg = 'lg',
    Md = 'md',
    Sm = 'sm'
}

const enum Rounded {
    Base = '',
    Sm = 'sm',
    Lg = 'lg',
    Full = 'full'
}

const enum Views {
    Filled = 'filled',
    Outlined = 'outlined',
    Ghost = 'ghost'
}

// Which tag component can be
type ComponentTagType = 'button' | 'RouterLink' | 'a'  | 'label';

// Attributes for different tags

interface IHTMLButtonAttributes {
    disabled?: boolean;
    name?: string;
    type: 'button' | 'submit';
}

interface IRouterLinkAttributes {
    to?: object | string
}

interface IHTMLLinkAttributes {
    href: string;
    target: '_blank' | '_self';
}

interface IHTMLLabelAttributes {
    type: 'label';
}

interface IBaseButtonData {
    componentName: ComponentTagType;
    buttonAttrs: IHTMLButtonAttributes | IHTMLLinkAttributes | IRouterLinkAttributes | IHTMLLabelAttributes | null;
    hasContent: boolean
}

export {
    Themes,
    Sizes,
    Views,
    Rounded,
    ComponentTagType,
    IHTMLButtonAttributes,
    IRouterLinkAttributes,
    IHTMLLinkAttributes,
    IHTMLLabelAttributes,
    IBaseButtonData,
    Icons
}
