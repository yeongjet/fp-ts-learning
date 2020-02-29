import { Eq, getStructEq } from "fp-ts/lib/Eq";
import { getEq } from "fp-ts/lib/Array";

const eqNumber: Eq<number> = {
  equals: (x, y) => x === y
};

type Point = {
  x: number;
  y: number;
};

// const eqPoint: Eq<Point> = {
//     equals: (p1, p2) => p1 === p2 || (p1.x === p2.x && p1.y === p2.y)
// }

const eqPoint: Eq<Point> = getStructEq({
  x: eqNumber,
  y: eqNumber
});

eqPoint.equals({ x: 2, y: 1 }, { x: 2, y: 1 });

type Vector = {
  from: Point;
  to: Point;
};

const eqVector: Eq<Vector> = getStructEq({
  from: eqPoint,
  to: eqPoint
});

eqVector.equals(
  { from: { x: 2, y: 1 }, to: { x: 2, y: 1 } },
  { from: { x: 2, y: 1 }, to: { x: 2, y: 1 } }
);

const eqArrayOfPoints: Eq<Array<Point>> = getEq(eqPoint);
eqArrayOfPoints.equals(
  [
    { x: 1, y: 2 },
    { x: 3, y: 2 }
  ],
  [
    { x: 1, y: 2 },
    { x: 3, y: 2 }
  ]
);
