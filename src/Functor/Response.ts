import { Functor1 } from "fp-ts/lib/Functor";

export const URI = "Response";

export type URI = typeof URI;

declare module "fp-ts/lib/HKT" {
  interface URItoKind<A> {
    Response: Response<A>;
  }
}

export interface Response<A> {
  url: string;
  status: number;
  headers: Record<string, string>;
  body: A;
}

function map<A, B>(fa: Response<A>, f: (a: A) => B): Response<B> {
  return { ...fa, body: f(fa.body) };
}

// functor instance for `Response`
export const functorResponse: Functor1<URI> = {
  URI,
  map
};

functorResponse.map(b => b + "1");
