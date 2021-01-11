export interface Listing<T> {
  kind: string,
  data: Entry<T>
}

export interface Entry<T> {
  after: string,
  before: string,
  dist: number,
  modhash: string,
  children: Data<T>[]
}

export interface Data<T> {
  kind: Kind,
  data: T
}

export enum Kind {
  Comment = 't1',
  Account = 't2',
  Link = 't3',
  Message = 't4',
  Subreddit = 't5',
  Award = 't6'
}

export interface IVotable {
  ups: number
  downs: number
  likes?: boolean
}

export interface ICreated {
  created: number
  created_utc: number
}
