import { Icons } from '@/components/BaseIcon/types';

type Themes =  '' | 'gray' | 'gray-500' | 'surface' | 'primary' | 'primary-200' | 'white' | 'alert';
type Views = 'filled' | 'outlined' | 'ghost' | '';
type Sizes = 'lg' | 'md' | 'sm' | 'icon' | 'mobile' | '';
type Rounded = 'base' | 'sm' | 'lg' | 'full' | 'icon';
type Justify = 'start' | 'center';

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
    Justify,
    ComponentTagType,
    IHTMLButtonAttributes,
    IRouterLinkAttributes,
    IHTMLLinkAttributes,
    IHTMLLabelAttributes,
    IBaseButtonData,
    Icons
}
