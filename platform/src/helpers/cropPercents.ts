function cropPercents(x: number | string): string {
    return x.toString().length > 5
        ? x.toString().slice(0, 5)
        : x.toString();
}

export default cropPercents;
