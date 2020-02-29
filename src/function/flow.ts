import { flow } from 'fp-ts/lib/function'

const a = (value: string): number => {
    return a.length
}

const b = (value: number): boolean => {
    return value > 10
}

const r = flow(a, b)('gawegwe')

console.log(r)