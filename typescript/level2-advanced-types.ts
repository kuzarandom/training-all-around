// ===== Level 2: Keyof / Indexed Access / Mapped / Conditional =====

// 1. keyof T → union ของ property name
interface SimpleUser {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UserKeys = keyof SimpleUser; // "id" | "name" | "email" | "age"

function getUserProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const userExample: SimpleUser = { id: 1, name: "John", email: "john@example.com", age: 25 };
const userName = getUserProperty(userExample, "name"); // type: string
const userAge = getUserProperty(userExample, "age");   // type: number

// 2. T[K] → เอา type ของ property (Indexed Access Types)
type UserName = SimpleUser["name"]; // string
type UserInfo = SimpleUser["name" | "email"]; // string
type UserValues = SimpleUser[keyof SimpleUser]; // string | number

// ใช้กับ array
const fruitsConst = ["apple", "banana", "orange"] as const;
type Fruit = typeof fruitsConst[number]; // "apple" | "banana" | "orange"

// 3. Mapped Types → loop key เพื่อสร้าง type ใหม่

// สร้าง Readonly version
type ReadonlyUser = {
  readonly [K in keyof SimpleUser]: SimpleUser[K];
};

// สร้าง Optional version
type PartialUser = {
  [K in keyof SimpleUser]?: SimpleUser[K];
};

// สร้าง Nullable version
type NullableUser = {
  [K in keyof SimpleUser]: SimpleUser[K] | null;
};

// สร้าง String version (เปลี่ยน type ทุกตัวเป็น string)
type StringifyUser = {
  [K in keyof SimpleUser]: string;
};

// Custom mapped type with conditional
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

class Example {
  name: string = "test";
  age: number = 25;
  greet(): void {}
}

type ExampleData = NonFunctionProperties<Example>; // { name: string; age: number }

// 4. Conditional Types → T extends U ? X : Y

// ตรวจสอบว่าเป็น array หรือไม่
type IsArray<T> = T extends readonly unknown[] ? true : false;

type Test1 = IsArray<string[]>; // true
type Test2 = IsArray<number>;   // false

// ดึง type ออกจาก array
type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

type StringArrayElement = ArrayElement<string[]>; // string
type NumberArrayElement = ArrayElement<number[]>; // number

// ตรวจสอบ function
type IsFunction<T> = T extends (...args: any[]) => any ? true : false;

type FuncTest1 = IsFunction<() => void>; // true
type FuncTest2 = IsFunction<string>;     // false

// 5. Infer → ดึง type จาก function / promise

// ดึง return type จาก function
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getValue(): { id: number; name: string } {
  return { id: 1, name: "test" };
}

type ValueType = GetReturnType<typeof getValue>; // { id: number; name: string }

// ดึง parameter types
type GetFirstParam<T> = T extends (first: infer P, ...args: any[]) => any ? P : never;

function processUser(user: SimpleUser, options: { sort: boolean }): void {}

type FirstParamType = GetFirstParam<typeof processUser>; // SimpleUser

// ดึง type จาก Promise
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type PromiseResult = UnwrapPromise<Promise<string>>; // string
type NonPromiseResult = UnwrapPromise<number>; // number

// ดึง type จาก array
type Head<T> = T extends readonly [infer H, ...any[]] ? H : never;
type Tail<T> = T extends readonly [any, ...infer Rest] ? Rest : never;

type FirstElement = Head<[1, 2, 3]>; // 1
type RestElements = Tail<[1, 2, 3]>; // [2, 3]

// Advanced: Recursive conditional type
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface NestedData {
  user: {
    profile: {
      name: string;
      settings: {
        theme: string;
      };
    };
  };
}

type ReadonlyNestedData = DeepReadonly<NestedData>;
// ทุก property จะเป็น readonly รวมถึง nested objects

// Distributive conditional types
type ToArray<T> = T extends any ? T[] : never;

type StringOrNumberArray = ToArray<string | number>; // string[] | number[]

// Non-distributive version
type ToArrayNonDistributive<T> = [T] extends [any] ? T[] : never;

type UnionArray = ToArrayNonDistributive<string | number>; // (string | number)[]
