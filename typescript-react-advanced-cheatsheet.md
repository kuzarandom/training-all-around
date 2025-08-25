# 🚀 TypeScript + React Advanced Cheat Sheet

## Level 1: พื้นฐาน TypeScript
- Primitive types: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`
- Object, Array, Tuple
- Union (`|`) & Intersection (`&`)
- Function typing
- Type vs Interface
- Generics (พื้นฐาน)

---

## Level 2: Keyof / Indexed Access / Mapped / Conditional
- `keyof T` → union ของ property name
- `T[K]` → เอา type ของ property
- Mapped Types → loop key เพื่อสร้าง type ใหม่ (`Readonly`, `Partial`)
- Conditional Types → `T extends U ? X : Y`
- Infer → ดึง type จาก function / promise

---

## Level 3: Utility Types
- `Partial<T>` / `Required<T>` / `Readonly<T>`
- `Pick<T, K>` / `Omit<T, K>` / `Record<K, T>`
- `Exclude<T, U>` / `Extract<T, U>` / `NonNullable<T>`
- `ReturnType<T>` / `InstanceType<T>`

---

## Level 4: Advanced Type Programming
- **Recursive Types** → nested object, JSON
- **Variadic Tuple** → dynamic tuple manipulation
- **Template Literal Types** → dynamic string types
- **Distributive Conditional** → union spread
- **Infer** → extract type
- **DeepPartial / DeepReadonly** → nested type transformation
- **Branding** → nominal typing, semantic-safe types

---

## Level 5: Advanced TypeScript + React
- **Generic Components** → reusable, type-safe
- **Conditional Props** → union + type narrowing
- **Branding** → semantic-safe props / state
- **Utility Types** → Pick, Omit, Partial, Readonly
- **Generic Hooks** → type-safe state management
- **HOC + Generics** → preserve type ของ original component

---

## 📁 Code Examples
- **Level 1**: [`typescript/level1-basics.ts`](./typescript/level1-basics.ts)
- **Level 2**: [`typescript/level2-advanced-types.ts`](./typescript/level2-advanced-types.ts)  
- **Level 3**: [`typescript/level3-utility-types.ts`](./typescript/level3-utility-types.ts)
- **Level 4**: [`typescript/level4-advanced-programming.ts`](./typescript/level4-advanced-programming.ts)
- **Level 5**: [`typescript/level5-react-advanced.tsx`](./typescript/level5-react-advanced.tsx)
- **Real-world**: [`typescript/real-world-examples.ts`](./typescript/real-world-examples.ts)

---

## 🚀 Getting Started
```bash
# Clone และติดตั้ง dependencies
npm install

# Type checking
npm run type-check

# Watch mode
npm run type-check:watch
```

---

## 📚 เนื้อหาเพิ่มเติม

### Level 1: พื้นฐาน TypeScript
- **Primitive types**: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`
- **Objects & Arrays**: Interface definitions, array typing, tuple constraints
- **Union & Intersection**: `|` for either/or, `&` for combining types
- **Function typing**: Parameter/return types, overloads, optional parameters
- **Type vs Interface**: When to use each, extension capabilities
- **Generics**: Reusable type parameters, constraints, multiple parameters

### Level 2: Advanced Type Operations
- **`keyof T`**: Extract property names as union type
- **`T[K]`**: Indexed access for property types
- **Mapped Types**: Transform existing types (`Readonly<T>`, `Partial<T>`)
- **Conditional Types**: `T extends U ? X : Y` logic
- **`infer`**: Extract types from function signatures, Promises, etc.

### Level 3: Built-in Utility Types
- **Transformation**: `Partial<T>`, `Required<T>`, `Readonly<T>`
- **Selection**: `Pick<T, K>`, `Omit<T, K>`
- **Creation**: `Record<K, T>`
- **Filtering**: `Exclude<T, U>`, `Extract<T, U>`, `NonNullable<T>`
- **Function/Class**: `ReturnType<T>`, `InstanceType<T>`

### Level 4: Advanced Type Programming
- **Recursive Types**: Self-referencing for nested structures, JSON
- **Variadic Tuples**: Dynamic tuple manipulation (Head, Tail, Reverse)
- **Template Literals**: String manipulation at type level
- **Distributive Conditionals**: Union type processing
- **Branding**: Nominal typing for semantic safety
- **Deep Utilities**: `DeepPartial`, `DeepReadonly` for nested objects

### Level 5: TypeScript + React Integration
- **Generic Components**: Type-safe reusable components
- **Conditional Props**: Union types with discriminated properties
- **Custom Hooks**: Generic hooks for state management
- **HOCs with Generics**: Preserve original component types
- **Form Handling**: Type-safe form state and validation
- **Event Handling**: Strongly-typed event systems

---
