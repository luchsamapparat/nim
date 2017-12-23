export function getMaxTokensToRemove(heapSize: number) {
    return heapSize > 3 ? 3 : heapSize;
}
