function cutAddress(address: string): string {
    return address ? address.slice(0, 4) + '...' + address.slice(-4) : '';
}

export default cutAddress;
