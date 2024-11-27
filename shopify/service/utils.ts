/** generate random between 0 and N */
export function generateRandomNumber(max: number): number {
  return Math.floor(Math.random() * max)
}

/** mocked */
export function groupBy(_array: any[], _keyGetter: string): any {
  return { key1: [], key2: [] }
}

/** mocked */
export function sortBy(_array: any[], _sorting: 'asc' | 'desc', _objectKeyToSort?: string): any[] {
  return []
}