enum Currency {
    BUSD,
    USDT,
    USDC
}

const currenyItems = [
    {
        title: 'BUSD',
        id: Currency.BUSD,
        icon: 'currency-busd'
    },
    {
        title: 'USDT',
        id: Currency.USDT,
        icon: 'currency-usdt'
    },
    {
        title: 'USDC',
        id: Currency.USDC,
        icon: 'currency-usdc'
    },
];

export {
    Currency,
    currenyItems
}
