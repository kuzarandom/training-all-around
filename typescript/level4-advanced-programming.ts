// ===== Level 4: Advanced Type Programming =====

// 1. Recursive Types → nested object, JSON
type JsonValue = 
  | string 
  | number 
  | boolean 
  | null 
  | JsonValue[] 
  | { [key: string]: JsonValue };

interface NestedObject {
  name: string;
  children?: NestedObject[];
}

// Deep utility types
type DeepPartialAdvanced<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartialAdvanced<T[P]> : T[P];
};

type DeepReadonlyAdvanced<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonlyAdvanced<T[P]> : T[P];
};

interface UserProfile {
  personal: {
    name: string;
    age: number;
    address: {
      street: string;
      city: string;
      country: string;
    };
  };
  preferences: {
    theme: string;
    notifications: {
      email: boolean;
      sms: boolean;
    };
  };
}

type PartialUserProfile = DeepPartialAdvanced<UserProfile>;
type ReadonlyUserProfile = DeepReadonlyAdvanced<UserProfile>;

// 2. Variadic Tuple → dynamic tuple manipulation

// Head และ Tail
type HeadAdvanced<T extends readonly unknown[]> = T extends readonly [infer H, ...unknown[]] ? H : never;
type TailAdvanced<T extends readonly unknown[]> = T extends readonly [unknown, ...infer Rest] ? Rest : never;

type FirstElementAdvanced = HeadAdvanced<[1, 2, 3, 4]>; // 1
type RestElementsAdvanced = TailAdvanced<[1, 2, 3, 4]>; // [2, 3, 4]

// Prepend และ Append
type Prepend<T extends readonly unknown[], U> = [U, ...T];
type Append<T extends readonly unknown[], U> = [...T, U];

type WithFirst = Prepend<[2, 3], 1>; // [1, 2, 3]
type WithLast = Append<[1, 2], 3>; // [1, 2, 3]

// Reverse tuple
type Reverse<T extends readonly unknown[]> = T extends readonly [...infer Rest, infer Last]
  ? [Last, ...Reverse<Rest>]
  : [];

type Reversed = Reverse<[1, 2, 3, 4]>; // [4, 3, 2, 1]

// Length
type Length<T extends readonly unknown[]> = T['length'];

type TupleLength = Length<[1, 2, 3]>; // 3

// Join tuples
type Concat<T extends readonly unknown[], U extends readonly unknown[]> = [...T, ...U];

type Combined = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]

// 3. Template Literal Types → dynamic string types

// Basic template literals
type Greeting = `Hello, ${string}!`;
type WelcomeMessage = `Welcome, ${'user' | 'admin' | 'guest'}`;

// CSS properties
type CSSProperty = 'color' | 'background' | 'border';
type CSSValue = string;
type BasicCSSRule = `${CSSProperty}: ${CSSValue}`;

const cssRule: BasicCSSRule = "color: red"; // ✓
// const invalidRule: CSSRule = "invalid: value"; // ✗

// Event names
type EventName<T extends string> = `on${Capitalize<T>}`;

type ButtonEvents = EventName<'click' | 'hover' | 'focus'>;
// "onClick" | "onHover" | "onFocus"

// API endpoints
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = '/users' | '/products' | '/orders';
type ApiRoute = `${HttpMethod} ${Endpoint}`;

type UserRoutes = `${'GET' | 'POST'} /users`; // "GET /users" | "POST /users"

// Snake case to camel case
type SnakeToCamel<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${P1}${Uppercase<P2>}${SnakeToCamel<P3>}`
  : S;

type CamelCase = SnakeToCamel<"user_profile_settings">; // "userProfileSettings"

// 4. Distributive Conditional → union spread

// แยก union type
type ToArrayAdvanced<T> = T extends any ? T[] : never;
type StringOrNumberArraysAdvanced = ToArrayAdvanced<string | number>; // string[] | number[]

// Filter union
type FilterByType<T, U> = T extends U ? T : never;
type OnlyStrings = FilterByType<string | number | boolean, string>; // string

// Non-distributive (ใช้ tuple trick)
type ToArrayNonDistributiveAdvanced<T> = [T] extends [any] ? T[] : never;
type UnionArrayAdvanced = ToArrayNonDistributiveAdvanced<string | number>; // (string | number)[]

// Exclude functions from object
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type NonFunctionPropertyNamesAdvanced<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type FunctionPropertiesAdvanced<T> = Pick<T, FunctionPropertyNames<T>>;
type NonFunctionPropertiesAdvanced<T> = Pick<T, NonFunctionPropertyNamesAdvanced<T>>;

class ExampleClass {
  name: string = "test";
  age: number = 25;
  greet(): void {}
  getName(): string { return this.name; }
}

type OnlyMethods = FunctionPropertiesAdvanced<ExampleClass>; // { greet: () => void; getName: () => string; }
type OnlyData = NonFunctionPropertiesAdvanced<ExampleClass>; // { name: string; age: number; }

// 5. Branding → nominal typing, semantic-safe types

// Opaque types / Branded types
declare const __brand: unique symbol;
type Brand<T, TBrand extends string> = T & { readonly [__brand]: TBrand };

// User ID branding
type UserId = Brand<number, 'UserId'>;
type ProductId = Brand<number, 'ProductId'>;
type OrderId = Brand<string, 'OrderId'>;

// Helper functions to create branded types
const createUserId = (id: number): UserId => id as UserId;
const createProductId = (id: number): ProductId => id as ProductId;
const createOrderId = (id: string): OrderId => id as OrderId;

function getUserById(id: UserId): void {
  console.log(`Getting user ${id}`);
}

function getProductById(id: ProductId): void {
  console.log(`Getting product ${id}`);
}

const userId = createUserId(123);
const productId = createProductId(456);

getUserById(userId); // ✓
// getUserById(productId); // ✗ Type error!
// getUserById(123); // ✗ Type error!

// Email branding
type Email = Brand<string, 'Email'>;

const createEmail = (email: string): Email | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? email as Email : null;
};

function sendEmail(to: Email, subject: string): void {
  console.log(`Sending email to ${to}: ${subject}`);
}

const email = createEmail("user@example.com");
if (email) {
  sendEmail(email, "Welcome!"); // ✓
}
// sendEmail("invalid-email", "Test"); // ✗ Type error!

// URL branding
type Url = Brand<string, 'Url'>;
type SecureUrl = Brand<Url, 'Secure'>;

const createUrl = (url: string): Url | null => {
  try {
    new URL(url);
    return url as Url;
  } catch {
    return null;
  }
};

const createSecureUrl = (url: Url): SecureUrl | null => {
  return url.startsWith('https://') ? url as SecureUrl : null;
};

// Money branding with currency
type USD = Brand<number, 'USD'>;
type EUR = Brand<number, 'EUR'>;

const usd = (amount: number): USD => amount as USD;
const eur = (amount: number): EUR => amount as EUR;

function calculateTax(amount: USD): USD {
  return usd(amount * 1.1);
}

const price = usd(100);
const tax = calculateTax(price); // ✓
// const euroPrice = eur(100);
// calculateTax(euroPrice); // ✗ Type error!

// Complex branding example: Coordinates
type Latitude = Brand<number, 'Latitude'>;
type Longitude = Brand<number, 'Longitude'>;

interface Coordinates {
  lat: Latitude;
  lng: Longitude;
}

const createLatitude = (lat: number): Latitude | null => {
  return lat >= -90 && lat <= 90 ? lat as Latitude : null;
};

const createLongitude = (lng: number): Longitude | null => {
  return lng >= -180 && lng <= 180 ? lng as Longitude : null;
};

function getDistance(from: Coordinates, to: Coordinates): number {
  // Calculate distance between coordinates
  return Math.sqrt(Math.pow(to.lat - from.lat, 2) + Math.pow(to.lng - from.lng, 2));
}

const bangkok: Coordinates = {
  lat: createLatitude(13.7563)!,
  lng: createLongitude(100.5018)!
};

// Advanced: Conditional branding
type PositiveNumber = Brand<number, 'Positive'>;
type NegativeNumber = Brand<number, 'Negative'>;

const createPositiveNumber = (n: number): PositiveNumber | null => {
  return n > 0 ? n as PositiveNumber : null;
};

// Template literal branding
type HexColor = Brand<string, 'HexColor'>;

const createHexColor = (color: string): HexColor | null => {
  const hexRegex = /^#[0-9A-Fa-f]{6}$/;
  return hexRegex.test(color) ? color as HexColor : null;
};

function setBackgroundColor(color: HexColor): void {
  console.log(`Setting background color to ${color}`);
}

const validColor = createHexColor("#FF5733");
if (validColor) {
  setBackgroundColor(validColor); // ✓
}
// setBackgroundColor("#invalid"); // ✗ Type error!
