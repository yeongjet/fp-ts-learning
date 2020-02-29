import R from 'ramda'
import { pipe } from 'fp-ts/lib/pipeable'
import * as T from 'fp-ts/lib/Task'
import * as O from 'fp-ts/lib/Option'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'

//[TE.tryCatch] <E, A>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => E): TaskEither<E, A> { ... }
//[TE.chain] <E, A, B>(f: (a: A) => TaskEither<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, B>
//[TE.fromOption] <E>(onNone: () => E) => <A>(ma: Option<A>) => TaskEither<E, A>
//[E.tryCatch] <E, A>(f: Lazy<A>, onError: (e: unknown) => E): Either<E, A> { ... }
//[E.fromOption] <E>(onNone: () => E) => <A>(ma: Option<A>) => Either<E, A>
//[E.chain] <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, B>
//[T.map] <A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B>

const token = 'gwaeg'
const main = pipe(
  R.isNil(token) ? O.none : O.some(token),
  E.fromOption(() => new Error('none!!!!'))
  //R.isNil(token) ? O.none : O.some(token),
  //T.map(E.chain(E.fromOption(() => new Error('none!!!!')))
)

;(async() => {
  
  if(E.isLeft(main)) {
    console.log(main.left)
  }else{
    console.log(main.right)
  }
})()
