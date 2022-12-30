function cutAddress(address: string, amount?: number, amountEnd?: number): string {
    amount = amount || 4;
    amountEnd = amountEnd || 4;

    return address ? address.slice(0, amount) + '...' + address.slice(-amountEnd) : '';
}

export default cutAddress;
