import IRouterLink from '@/models/routerLink';

interface IBreadcrumb {
    title: string
    link: IRouterLink
}

type Views = 'primary' | 'secondary'

export {
    IBreadcrumb,
    Views
}
