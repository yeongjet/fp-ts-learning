import * as T from "fp-ts/lib/Task";
import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from 'fp-ts/lib/pipeable'
import * as E from 'fp-ts/lib/Either'

const largeThan = (x: number): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        if(x > 10) {
            reject('fuck you')
        }
        setTimeout(() => {
            resolve(x++)
        }, 1000)
    })
}

const lessThan = (x: number): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        if(x < 20) {
            reject('fuck you')
        }
        setTimeout(() => {
            resolve(x++)
        }, 1000)
    })
}

const myjob = pipe(
    TE.right(13),
    TE.chain(d => TE.tryCatch(() => largeThan(d), E.toError)),
    TE.chain(x => TE.tryCatch(() => lessThan(x), E.toError))
)

;(async() => {
    const result = await myjob()
    if(E.isRight(result)) {
        
    }
})()
