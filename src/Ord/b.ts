import { Ord, fromCompare, contramap, getDualOrd } from "fp-ts/lib/Ord";

const ordNumber: Ord<number> = fromCompare((x, y) =>
  x < y ? -1 : x > y ? 1 : 0
);

function min<A>(O: Ord<A>): (x: A, y: A) => A {
  return (x, y) => (O.compare(x, y) === 1 ? y : x);
}

function max<A>(O: Ord<A>): (x: A, y: A) => A {
    return min(getDualOrd(O))
}

type User = {
  name: string;
  age: number;
};

// const byAge: Ord<User> = fromCompare((x, y) => ordNumber.compare(x.age, y.age));
const byAge: Ord<User> = contramap((user: User) => user.age)(ordNumber);
const getYounger = min(byAge);
const getOlder = max(byAge)

byAge.compare({ name: "zh", age: 12 }, { name: "pj", age: 12 });
getYounger({ name: "Guido", age: 48 }, { name: "Giulio", age: 45 }); // { name: 'Giulio', age: 45 }
getOlder({ name: 'Guido', age: 48 }, { name: 'Giulio', age: 45 }) // { name: 'Guido', age: 48 }
