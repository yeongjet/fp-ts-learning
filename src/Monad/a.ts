import { flatten } from 'fp-ts/lib/Array'
import { array, head } from 'fp-ts/lib/Array'
import { Option, some, none, option } from 'fp-ts/lib/Option'

interface User {
  followers: Array<User>;
}

const getFollowers = (user: User): Array<User> => user.followers;

declare const user: User;

// const followersOfFollowers: Array<Array<User>> = getFollowers(user).map(
//   getFollowers
// );

// const followersOfFollowers: Array<User> = flatten(getFollowers(user).map(getFollowers))
const inverse = (n: number): Option<number> => (n === 0 ? none : some(1 / n))

const followersOfFollowers: Array<User> = array.chain(getFollowers(user), getFollowers)

const headInverse: Option<number> = option.chain(head([1, 2, 3]), inverse)