import { Eq } from "fp-ts/lib/Eq";
import { contramap } from "fp-ts/lib/Eq";

const eqNumber: Eq<number> = {
  equals: (x, y) => x === y
};

type User = {
  userId: number;
  name: string;
};

/** two users are equal if their `userId` field is equal */
const eqUser = contramap((user: User) => user.userId)(eqNumber);

eqUser.equals(
  { userId: 1, name: "Giulio" },
  { userId: 1, name: "Giulio Canti" }
); // true
eqUser.equals({ userId: 1, name: "Giulio" }, { userId: 2, name: "Giulio" }); // false
