import IRouterLink from '@/models/routerLink';

interface IBreadcrumb {
    title: string
    link: IRouterLink
}

enum Views {
    Primary = 'primary',
    Secondary = 'secondary'
}

export {
    IBreadcrumb,
    Views
}
