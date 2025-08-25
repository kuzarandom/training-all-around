// ===== Level 3: Utility Types =====

interface UtilityUser {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description?: string;
}

// 1. Partial<T> - ทำให้ property ทั้งหมดเป็น optional
type PartialUserType = Partial<UtilityUser>;
// { id?: number; name?: string; email?: string; age?: number; isActive?: boolean; }

function updateUser(id: number, updates: Partial<UtilityUser>): void {
  // สามารถส่งแค่ field ที่ต้องการ update
  console.log(`Updating user ${id}`, updates);
}

updateUser(1, { name: "John Doe" }); // ส่งแค่ name
updateUser(2, { age: 30, isActive: false }); // ส่งหลาย field

// 2. Required<T> - ทำให้ property ทั้งหมดเป็น required
type RequiredProduct = Required<Product>;
// { id: number; name: string; price: number; category: string; description: string; }

function createProduct(product: RequiredProduct): void {
  // description ที่เป็น optional ใน Product จะต้องมีใน RequiredProduct
  console.log("Creating product:", product);
}

// 3. Readonly<T> - ทำให้ property ทั้งหมดเป็น readonly
type ReadonlyUserType = Readonly<UtilityUser>;

const readonlyUserExample: ReadonlyUserType = {
  id: 1,
  name: "John",
  email: "john@example.com",
  age: 25,
  isActive: true
};

// readonlyUserExample.name = "Jane"; // Error: Cannot assign to 'name' because it is read-only

// 4. Pick<T, K> - เลือกเฉพาะ property ที่ต้องการ
type UserBasicInfo = Pick<UtilityUser, "id" | "name">;
// { id: number; name: string; }

type ProductSummary = Pick<Product, "name" | "price">;
// { name: string; price: number; }

function getUserBasicInfo(user: UtilityUser): UserBasicInfo {
  return {
    id: user.id,
    name: user.name
  };
}

// 5. Omit<T, K> - ตัด property ที่ไม่ต้องการออก
type UserWithoutId = Omit<UtilityUser, "id">;
// { name: string; email: string; age: number; isActive: boolean; }

type CreateUserRequest = Omit<UtilityUser, "id">;

function createNewUser(userData: CreateUserRequest): UtilityUser {
  return {
    id: Math.floor(Math.random() * 1000),
    ...userData
  };
}

// 6. Record<K, T> - สร้าง object type ที่มี key เป็น K และ value เป็น T
type UserRoles = Record<string, boolean>;
// { [x: string]: boolean; }

type ThemeColors = Record<"primary" | "secondary" | "accent", string>;
// { primary: string; secondary: string; accent: string; }

const theme: ThemeColors = {
  primary: "#007bff",
  secondary: "#6c757d",
  accent: "#28a745"
};

type UserPermissions = Record<number, UtilityUser>;
const usersById: UserPermissions = {
  1: { id: 1, name: "John", email: "john@example.com", age: 25, isActive: true },
  2: { id: 2, name: "Jane", email: "jane@example.com", age: 30, isActive: false }
};

// 7. Exclude<T, U> - ตัด type U ออกจาก union T
type AllColors = "red" | "green" | "blue" | "yellow";
type PrimaryColors = Exclude<AllColors, "yellow">; // "red" | "green" | "blue"

type NonStringTypes = Exclude<string | number | boolean, string>; // number | boolean

// 8. Extract<T, U> - เอาเฉพาะ type ที่ตรงกับ U จาก union T
type OnlyStringTypes = Extract<string | number | boolean, string>; // string
type WarmColors = Extract<AllColors, "red" | "yellow" | "orange">; // "red" | "yellow"

// 9. NonNullable<T> - ตัด null และ undefined ออก
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>; // string

function processValue(value: NonNullable<string | null | undefined>): void {
  // value จะเป็น string เท่านั้น ไม่มี null หรือ undefined
  console.log(value.toUpperCase());
}

// 10. ReturnType<T> - เอา return type จาก function
function getUser(): { id: number; name: string } {
  return { id: 1, name: "John" };
}

type GetUserReturn = ReturnType<typeof getUser>; // { id: number; name: string }

async function fetchUsers(): Promise<UtilityUser[]> {
  return [];
}

type FetchUsersReturn = ReturnType<typeof fetchUsers>; // Promise<UtilityUser[]>

// 11. InstanceType<T> - เดิมใช้กับ class constructor, ตอนนี้จะใช้ ReturnType แทน
interface DatabaseConnection {
  host: string;
  port: number;
  connect(): void;
}

function createDatabaseConnection(host: string, port: number): DatabaseConnection {
  return {
    host,
    port,
    connect(): void {
      console.log(`Connecting to ${host}:${port}`);
    }
  };
}

type DBConnectionInstance = ReturnType<typeof createDatabaseConnection>;
// DatabaseConnection

function createConnection(connectionFactory: (host: string, port: number) => DBConnectionInstance): DBConnectionInstance {
  return connectionFactory("localhost", 5432);
}

// ===== ตัวอย่างการใช้ร่วมกัน =====

// สร้าง API response type
interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

type UserResponse = ApiResponse<UtilityUser>;
type UsersResponse = ApiResponse<UtilityUser[]>;
type PartialUserResponse = ApiResponse<Partial<UtilityUser>>;

// สร้าง CRUD operations
interface CrudOperations<T, K extends keyof T> {
  create: (data: Omit<T, K>) => T;
  read: (id: T[K]) => T | null;
  update: (id: T[K], data: Partial<T>) => T;
  delete: (id: T[K]) => boolean;
}

type UserCrud = CrudOperations<UtilityUser, "id">;

const userService: UserCrud = {
  create: (data) => ({ id: Math.random(), ...data }),
  read: (id) => null,
  update: (id, data) => ({ id, name: "", email: "", age: 0, isActive: false, ...data }),
  delete: (id) => true
};

// Form handling with utility types
type CustomFormData<T> = {
  [K in keyof T]: {
    value: T[K];
    error?: string;
    touched: boolean;
  }
};

type UserFormData = CustomFormData<Omit<UtilityUser, "id">>;

const userForm: UserFormData = {
  name: { value: "", touched: false },
  email: { value: "", error: "Invalid email", touched: true },
  age: { value: 0, touched: false },
  isActive: { value: true, touched: false }
};
