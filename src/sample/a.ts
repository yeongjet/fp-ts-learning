import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'

function originalMonthExchangeRate(_from: string, _to: string, _date: Date): Promise<O.Option<number>> {
  return Promise.resolve(O.none)
}
//[T.map] <A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B>
//[T.tryCatch] <A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B>
//[T.map] <A, B>(f: (a: A) => B) => (fa: Task<A>) => Task<B>

//[TE.tryCatch] <E, A>(f: Lazy<Promise<A>>, onRejected: (reason: unknown) => E): TaskEither<E, A> { ... }
//[TE.fromOption] <E>(onNone: () => E) => <A>(ma: Option<A>) => TaskEither<E, A>
//[TE.chain] <E, A, B>(f: (a: A) => TaskEither<E, B>) => (ma: TaskEither<E, A>) => TaskEither<E, B>

//[E.tryCatch] <E, A>(f: Lazy<A>, onError: (e: unknown) => E): Either<E, A> { ... }
//[E.fromOption] <E>(onNone: () => E) => <A>(ma: Option<A>) => Either<E, A>
//[E.chain] <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, B>
function monthExchangeRate(from: string, to: string, date: Date): TE.TaskEither<Error, number> {
  return pipe(
    TE.tryCatch(() => originalMonthExchangeRate(from, to, date), E.toError),
    T.map(E.chain(E.fromOption(() => new Error('no rate found'))))
  )
}

const main: T.Task<void> = pipe(
  TE.right(new Date('2020-01-14')),
  TE.chain(d => monthExchangeRate('USD', 'EUR', d)),
  // ... more piping ...
  TE.fold(
    e =>
      T.fromIO(() => {
        console.log('Erreur')
        console.log(e)
      }),
    res =>
      T.fromIO(() => {
        console.log('Tout va bien')
        console.log(res)
    })
  )
)
