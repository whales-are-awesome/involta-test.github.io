import IRouterLink from '@/types/routerLink';

interface IBreadcrumb {
    title?: string
    link?: IRouterLink
    dots?: boolean
}

type Views = 'primary' | 'secondary'

export {
    IBreadcrumb,
    Views
}
