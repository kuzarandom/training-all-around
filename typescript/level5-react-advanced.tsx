// // ===== Level 5: Advanced TypeScript + React =====


// // 1. Generic Components → reusable, type-safe

// interface ListProps<T> {
//   items: T[];
//   renderItem: (item: T, index: number) => React.ReactNode;
//   keyExtractor: (item: T) => string | number;
//   emptyMessage?: string;
// }

// function List<T>({ items, renderItem, keyExtractor, emptyMessage = "No items" }: ListProps<T>) {
//   if (items.length === 0) {
//     return <div>{emptyMessage}</div>;
//   }

//   return (
//     <ul>
//       {items.map((item, index) => (
//         <li key={keyExtractor(item)}>
//           {renderItem(item, index)}
//         </li>
//       ))}
//     </ul>
//   );
// }

// // Usage examples
// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// interface Product {
//   id: string;
//   name: string;
//   price: number;
// }

// const UserList = () => {
//   const users: User[] = [
//     { id: 1, name: "John", email: "john@example.com" },
//     { id: 2, name: "Jane", email: "jane@example.com" }
//   ];

//   return (
//     <List
//       items={users}
//       keyExtractor={(user) => user.id}
//       renderItem={(user) => (
//         <div>
//           <strong>{user.name}</strong> - {user.email}
//         </div>
//       )}
//       emptyMessage="No users found"
//     />
//   );
// };

// const ProductList = () => {
//   const products: Product[] = [
//     { id: "p1", name: "Laptop", price: 999 },
//     { id: "p2", name: "Mouse", price: 29 }
//   ];

//   return (
//     <List
//       items={products}
//       keyExtractor={(product) => product.id}
//       renderItem={(product) => (
//         <div>
//           {product.name} - ${product.price}
//         </div>
//       )}
//     />
//   );
// };

// // Generic Table Component
// interface Column<T> {
//   key: keyof T;
//   header: string;
//   render?: (value: T[keyof T], item: T) => React.ReactNode;
// }

// interface TableProps<T> {
//   data: T[];
//   columns: Column<T>[];
//   onRowClick?: (item: T) => void;
// }

// function Table<T>({ data, columns, onRowClick }: TableProps<T>) {
//   return (
//     <table>
//       <thead>
//         <tr>
//           {columns.map((column) => (
//             <th key={column.key as string}>{column.header}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index) => (
//           <tr 
//             key={index} 
//             onClick={() => onRowClick?.(item)}
//             style={{ cursor: onRowClick ? 'pointer' : 'default' }}
//           >
//             {columns.map((column) => (
//               <td key={column.key as string}>
//                 {column.render 
//                   ? column.render(item[column.key], item)
//                   : String(item[column.key])
//                 }
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// // 2. Conditional Props → union + type narrowing

// // Variant-based conditional props
// type ButtonVariant = 'primary' | 'secondary' | 'danger';

// type ButtonProps = 
//   | {
//       variant: 'primary';
//       children: React.ReactNode;
//       onClick: () => void;
//     }
//   | {
//       variant: 'secondary';
//       children: React.ReactNode;
//       onClick: () => void;
//       disabled?: boolean;
//     }
//   | {
//       variant: 'danger';
//       children: React.ReactNode;
//       onClick: () => void;
//       confirmMessage: string; // Required for danger variant
//     };

// const Button: React.FC<ButtonProps> = (props) => {
//   const handleClick = () => {
//     if (props.variant === 'danger') {
//       // TypeScript knows confirmMessage exists here
//       if (window.confirm(props.confirmMessage)) {
//         props.onClick();
//       }
//     } else {
//       props.onClick();
//     }
//   };

//   return (
//     <button 
//       onClick={handleClick}
//       disabled={props.variant === 'secondary' ? props.disabled : false}
//       className={`btn btn-${props.variant}`}
//     >
//       {props.children}
//     </button>
//   );
// };

// // Modal with conditional props based on type
// type ModalProps = 
//   | {
//       type: 'alert';
//       title: string;
//       message: string;
//       onClose: () => void;
//     }
//   | {
//       type: 'confirm';
//       title: string;
//       message: string;
//       onConfirm: () => void;
//       onCancel: () => void;
//     }
//   | {
//       type: 'custom';
//       children: React.ReactNode;
//       onClose: () => void;
//     };

// const Modal: React.FC<ModalProps> = (props) => {
//   return (
//     <div className="modal">
//       <div className="modal-content">
//         {props.type === 'alert' && (
//           <>
//             <h2>{props.title}</h2>
//             <p>{props.message}</p>
//             <button onClick={props.onClose}>OK</button>
//           </>
//         )}
        
//         {props.type === 'confirm' && (
//           <>
//             <h2>{props.title}</h2>
//             <p>{props.message}</p>
//             <button onClick={props.onConfirm}>Confirm</button>
//             <button onClick={props.onCancel}>Cancel</button>
//           </>
//         )}
        
//         {props.type === 'custom' && (
//           <>
//             {props.children}
//             <button onClick={props.onClose}>Close</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// // 3. Generic Hooks → type-safe state management

// // Generic useLocalStorage hook
// function useLocalStorage<T>(
//   key: string,
//   initialValue: T
// ): [T, (value: T | ((prev: T) => T)) => void] {
//   const [storedValue, setStoredValue] = useState<T>(() => {
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.error(`Error reading localStorage key "${key}":`, error);
//       return initialValue;
//     }
//   });

//   const setValue = (value: T | ((prev: T) => T)) => {
//     try {
//       const valueToStore = value instanceof Function ? value(storedValue) : value;
//       setStoredValue(valueToStore);
//       window.localStorage.setItem(key, JSON.stringify(valueToStore));
//     } catch (error) {
//       console.error(`Error setting localStorage key "${key}":`, error);
//     }
//   };

//   return [storedValue, setValue];
// }

// // Usage
// const UserSettings = () => {
//   const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
//   const [userData, setUserData] = useLocalStorage<User | null>('user', null);

//   return (
//     <div>
//       <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
//         Current theme: {theme}
//       </button>
//     </div>
//   );
// };

// // Generic useAPI hook
// interface ApiState<T> {
//   data: T | null;
//   loading: boolean;
//   error: string | null;
// }

// function useAPI<T>(url: string): ApiState<T> & { refetch: () => void } {
//   const [state, setState] = useState<ApiState<T>>({
//     data: null,
//     loading: true,
//     error: null
//   });

//   const fetchData = useCallback(async () => {
//     setState(prev => ({ ...prev, loading: true, error: null }));
    
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data: T = await response.json();
//       setState({ data, loading: false, error: null });
//     } catch (error) {
//       setState({ 
//         data: null, 
//         loading: false, 
//         error: error instanceof Error ? error.message : 'Unknown error'
//       });
//     }
//   }, [url]);

//   React.useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return { ...state, refetch: fetchData };
// }

// // 4. HOC + Generics → preserve type ของ original component

// // Generic HOC that adds loading functionality
// interface WithLoadingProps {
//   isLoading: boolean;
//   loadingMessage?: string;
// }

// function withLoading<P extends object>(
//   WrappedComponent: ComponentType<P>
// ): ComponentType<P & WithLoadingProps> {
//   return function WithLoadingComponent(props: P & WithLoadingProps) {
//     const { isLoading, loadingMessage = 'Loading...', ...restProps } = props;

//     if (isLoading) {
//       return <div className="loading">{loadingMessage}</div>;
//     }

//     return <WrappedComponent {...(restProps as P)} />;
//   };
// }

// // Original component
// interface UserProfileProps {
//   user: User;
//   onEdit: (user: User) => void;
// }

// const UserProfile: React.FC<UserProfileProps> = ({ user, onEdit }) => {
//   return (
//     <div>
//       <h2>{user.name}</h2>
//       <p>{user.email}</p>
//       <button onClick={() => onEdit(user)}>Edit</button>
//     </div>
//   );
// };

// // Enhanced component with loading
// const UserProfileWithLoading = withLoading(UserProfile);

// // Usage maintains type safety
// const App = () => {
//   const user: User = { id: 1, name: "John", email: "john@example.com" };
//   const [isLoading, setIsLoading] = useState(false);

//   return (
//     <UserProfileWithLoading
//       user={user}
//       onEdit={(user) => console.log('Editing:', user)}
//       isLoading={isLoading}
//       loadingMessage="Loading user profile..."
//     />
//   );
// };

// // Generic HOC for error boundaries
// interface WithErrorBoundaryState {
//   hasError: boolean;
//   error?: Error;
// }

// function withErrorBoundary<P extends object>(
//   WrappedComponent: ComponentType<P>,
//   FallbackComponent?: ComponentType<{ error: Error }>
// ): ComponentType<P> {
//   return class extends React.Component<P, WithErrorBoundaryState> {
//     constructor(props: P) {
//       super(props);
//       this.state = { hasError: false };
//     }

//     static getDerivedStateFromError(error: Error): WithErrorBoundaryState {
//       return { hasError: true, error };
//     }

//     componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
//       console.error('Error caught by boundary:', error, errorInfo);
//     }

//     render() {
//       if (this.state.hasError) {
//         if (FallbackComponent && this.state.error) {
//           return <FallbackComponent error={this.state.error} />;
//         }
//         return <div>Something went wrong.</div>;
//       }

//       return <WrappedComponent {...this.props} />;
//     }
//   };
// }

// // 5. Form handling with advanced types

// interface FormField<T> {
//   value: T;
//   error?: string;
//   touched: boolean;
// }

// type FormState<T> = {
//   [K in keyof T]: FormField<T[K]>;
// };

// interface UseFormOptions<T> {
//   initialValues: T;
//   validate?: (values: T) => Partial<Record<keyof T, string>>;
// }

// function useForm<T extends Record<string, any>>({ 
//   initialValues, 
//   validate 
// }: UseFormOptions<T>) {
//   const [formState, setFormState] = useState<FormState<T>>(() => {
//     const initialState = {} as FormState<T>;
//     for (const key in initialValues) {
//       initialState[key] = {
//         value: initialValues[key],
//         touched: false
//       };
//     }
//     return initialState;
//   });

//   const setValue = <K extends keyof T>(field: K, value: T[K]) => {
//     setFormState(prev => ({
//       ...prev,
//       [field]: {
//         ...prev[field],
//         value,
//         touched: true
//       }
//     }));
//   };

//   const validateForm = () => {
//     if (!validate) return true;

//     const values = {} as T;
//     for (const key in formState) {
//       values[key] = formState[key].value;
//     }

//     const errors = validate(values);
//     let hasErrors = false;

//     const newFormState = { ...formState };
//     for (const key in formState) {
//       newFormState[key] = {
//         ...newFormState[key],
//         error: errors[key],
//         touched: true
//       };
//       if (errors[key]) hasErrors = true;
//     }

//     setFormState(newFormState);
//     return !hasErrors;
//   };

//   const getFieldProps = <K extends keyof T>(field: K) => ({
//     value: formState[field].value,
//     onChange: (value: T[K]) => setValue(field, value),
//     error: formState[field].error,
//     touched: formState[field].touched
//   });

//   return {
//     formState,
//     setValue,
//     validateForm,
//     getFieldProps
//   };
// }

// // Usage example
// interface RegistrationForm {
//   email: string;
//   password: string;
//   confirmPassword: string;
//   age: number;
// }

// const RegistrationComponent = () => {
//   const { getFieldProps, validateForm } = useForm<RegistrationForm>({
//     initialValues: {
//       email: '',
//       password: '',
//       confirmPassword: '',
//       age: 0
//     },
//     validate: (values) => {
//       const errors: Partial<Record<keyof RegistrationForm, string>> = {};
      
//       if (!values.email.includes('@')) {
//         errors.email = 'Invalid email';
//       }
      
//       if (values.password.length < 6) {
//         errors.password = 'Password must be at least 6 characters';
//       }
      
//       if (values.password !== values.confirmPassword) {
//         errors.confirmPassword = 'Passwords do not match';
//       }
      
//       if (values.age < 18) {
//         errors.age = 'Must be at least 18 years old';
//       }
      
//       return errors;
//     }
//   });

//   const emailProps = getFieldProps('email');
//   const passwordProps = getFieldProps('password');

//   return (
//     <form>
//       <input
//         type="email"
//         value={emailProps.value}
//         onChange={(e) => emailProps.onChange(e.target.value)}
//         placeholder="Email"
//       />
//       {emailProps.touched && emailProps.error && (
//         <span className="error">{emailProps.error}</span>
//       )}
      
//       <input
//         type="password"
//         value={passwordProps.value}
//         onChange={(e) => passwordProps.onChange(e.target.value)}
//         placeholder="Password"
//       />
//       {passwordProps.touched && passwordProps.error && (
//         <span className="error">{passwordProps.error}</span>
//       )}
      
//       <button type="button" onClick={validateForm}>
//         Register
//       </button>
//     </form>
//   );
// };
