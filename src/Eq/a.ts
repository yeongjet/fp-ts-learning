import { Eq } from "fp-ts/lib/Eq";

const eqNumber: Eq<number> = {
  equals: (x, y) => x === y
};

function elem<A>(E: Eq<A>): (a: A, as: Array<A>) => boolean {
  return (a, as) => as.some(item => E.equals(item, a));
}

elem(eqNumber)(1, [1, 2, 3]); // true
elem(eqNumber)(4, [1, 2, 3]); // false
