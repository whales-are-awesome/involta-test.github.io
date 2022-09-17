import { Icons } from '@/models/icons';

const enum Themes {
    Primary = 'primary',
    Secondary = 'secondary',
    Thirdly = 'thirdly',
    Purple = 'purple'
}

const enum Sizes {
    Sm = 'sm',
    Md = 'md',
    Lg = 'lg',
    Xl = 'xl',
    Icon = 'icon'
}

const enum Width {
    Full = 'full'
}

const enum Rounded {
    Base = 'base',
    Md = 'md',
    Lg = 'lg'
}

const enum Justify {
    Left = 'left',
    Center = 'center',
}

const enum Views {
    Filled = 'filled',
    Ghost = 'ghost',
    Icon = 'icon'
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
    Justify,
    Views,
    Width,
    Rounded,
    ComponentTagType,
    IHTMLButtonAttributes,
    IRouterLinkAttributes,
    IHTMLLinkAttributes,
    IHTMLLabelAttributes,
    IBaseButtonData,
    Icons
}
