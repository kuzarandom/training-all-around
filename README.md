# TypeScript + React Advanced Examples

## การติดตั้งและ Setup

### 1. ติดตั้ง Dependencies
```bash
npm install react react-dom
npm install -D @types/react @types/react-dom typescript
```

### 2. ไฟล์ tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "typescript/**/*"
  ]
}
```

## ไฟล์ Examples

### Level 1: พื้นฐาน TypeScript
- `level1-basics.ts` - Primitive types, Objects, Arrays, Tuples, Union/Intersection, Functions, Generics

### Level 2: Advanced Types
- `level2-advanced-types.ts` - keyof, Indexed Access, Mapped Types, Conditional Types, Infer

### Level 3: Utility Types
- `level3-utility-types.ts` - Partial, Required, Pick, Omit, Record, Exclude, Extract, etc.

### Level 4: Advanced Type Programming
- `level4-advanced-programming.ts` - Recursive Types, Template Literals, Branding, Deep utilities

### Level 5: React + TypeScript
- `level5-react-advanced.tsx` - Generic Components, Conditional Props, Generic Hooks, HOCs

## วิธีใช้งาน

1. Clone repository
2. ติดตั้ง dependencies ตามคำสั่งด้านบน
3. เปิดไฟล์ต่างๆ ใน VS Code เพื่อดู IntelliSense และ type checking
4. สำหรับ React examples, คุณสามารถสร้าง project ใหม่ด้วย Create React App + TypeScript:

```bash
npx create-react-app my-app --template typescript
```

แล้วคัดลอก code จาก `level5-react-advanced.tsx` ไปใช้

## หมายเหตุ

- ไฟล์ .tsx มี React JSX syntax ซึ่งต้องใช้ใน React project
- ไฟล์ .ts สามารถรันใน Node.js หรือใช้เป็น type definitions ได้
- แต่ละ level สร้างขึ้นจาก level ก่อนหน้า ดังนั้นควรเรียนตามลำดับ
