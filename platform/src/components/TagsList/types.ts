import IRouterLink from '@/types/routerLink';

interface IItem {
    title: string
    id: any
    to?: IRouterLink
}

type Sizes = 'sm' | 'md';

export {
    IItem,
    Sizes
}
