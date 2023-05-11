function cropPercents(x: number | string): number {
    return x.toString().length > 5
        ? Math.floor(+x * 100) / 100
        : +x;
}

export default cropPercents;
