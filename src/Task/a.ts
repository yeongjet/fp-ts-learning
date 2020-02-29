import * as T from "fp-ts/lib/Task";
import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from 'fp-ts/lib/pipeable'
import * as E from 'fp-ts/lib/Either'

const sf = (word: string): Promise<string> => {
  return (
     new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        resolve(word);
      }, 1000);
    })
  );
};

T.map(T.of(sf("hello")), n => n)
