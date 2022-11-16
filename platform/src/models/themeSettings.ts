type IItem = string | any[] | {
    [key: string]: any
};

type IThemeSettings<T extends string> = {
    [category in T]: IItem
}


export default IThemeSettings
