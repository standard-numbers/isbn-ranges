export type JSONValue =
  { [key: string]: JSONValue | JSONValue[] }
  | boolean
  | boolean[]
  | null
  | null[]
  | number
  | number[]
  | string
  | string[];
