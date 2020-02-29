import { Option, some, none, option } from 'fp-ts/lib/Option'
import { head } from 'fp-ts/lib/Array'
import { isNone } from 'fp-ts/lib/Option'

const flatten = <A>(mma: Option<Option<A>>): Option<A> => (isNone(mma) ? none : mma.value)

const inverse = (n: number): Option<number> => (n === 0 ? none : some(1 / n))

const inverseHead: Option<number> = flatten(option.map(head([1, 2, 3]), inverse))