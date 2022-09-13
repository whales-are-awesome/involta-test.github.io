function cutAddress(address: string): string {
    return address.slice(0, 6) + '...' + address.slice(-4);
}

export default cutAddress;
