// ===== Level 1: พื้นฐาน TypeScript =====

// 1. Primitive types
const username: string = "John Doe";
const age: number = 25;
const isActive: boolean = true;
const data: null = null;
const value: undefined = undefined;
const uniqueId: symbol = Symbol("id");
const bigNumber: bigint = 9007199254740991n;

// 2. Object, Array, Tuple
interface BasicUser {
  id: number;
  name: string;
  email: string;
}

const user: BasicUser = {
  id: 1,
  name: "John",
  email: "john@example.com",
};

const numbers: number[] = [1, 2, 3, 4];
const fruits: Array<string> = ["apple", "banana", "orange"];

// Tuple - ลำดับและ type ต้องตรงกัน
const userInfo: [string, number, boolean] = ["John", 25, true];
const coordinates: [number, number] = [10.5, 20.3];

// 3. Union & Intersection
type Status = "loading" | "success" | "error";
type ID = string | number;

function processId(id: ID): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}

// Intersection - รวม type เข้าด้วยกัน
interface Name {
  firstName: string;
  lastName: string;
}

interface Contact {
  email: string;
  phone: string;
}

type Person = Name & Contact;

const person: Person = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "+1234567890"
};

// 4. Function typing
function greet(name: string): string {
  return `Hello, ${name}!`;
}

const add = (a: number, b: number): number => a + b;

// Function with optional parameters
function createUser(name: string, age?: number): BasicUser {
  return {
    id: Math.random(),
    name,
    email: `${name.toLowerCase()}@example.com`
  };
}

// Function overloads
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  return value.toString();
}

// 5. Type vs Interface

// Type alias
type UserType = {
  id: number;
  name: string;
};

// Interface
interface UserInterface {
  id: number;
  name: string;
}

// Interface สามารถ extend ได้
interface AdminUser extends UserInterface {
  role: "admin";
  permissions: string[];
}

// Type สามารถใช้ union, intersection ได้ง่ายกว่า
type Theme = "light" | "dark";
type UserWithTheme = UserType & { theme: Theme };

// 6. Generics พื้นฐาน

// Generic function
function identity<T>(arg: T): T {
  return arg;
}

const stringResult = identity<string>("hello");
const numberResult = identity<number>(42);

// Generic interface
interface Container<T> {
  value: T;
  getValue(): T;
}

class Box<T> implements Container<T> {
  constructor(public value: T) {}
  
  getValue(): T {
    return this.value;
  }
}

const stringBox = new Box<string>("hello");
const numberBox = new Box<number>(42);

// Generic constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello"); // string has length
logLength([1, 2, 3]); // array has length
// logLength(42); // Error: number doesn't have length

// Multiple type parameters
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

const swapped = swap<string, number>(["hello", 42]); // [42, "hello"]
