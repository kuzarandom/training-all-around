// ===== ตัวอย่างการใช้งานจริง =====

// 1. API Type Definitions
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface UserBasic {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  createdAt: string;
  profile: {
    avatar?: string;
    bio?: string;
    preferences: {
      theme: 'light' | 'dark';
      notifications: boolean;
    };
  };
}

// 2. Error Handling Types
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

type Result<T, E = ApiError> = 
  | { success: true; data: T }
  | { success: false; error: E };

// 3. State Management Types
interface AppState {
  user: UserBasic | null;
  users: UserBasic[];
  loading: boolean;
  errors: Record<string, string>;
}

type AppAction = 
  | { type: 'SET_USER'; payload: UserBasic }
  | { type: 'SET_USERS'; payload: UserBasic[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: { key: string; message: string } }
  | { type: 'CLEAR_ERROR'; payload: string };

// 4. Form Types
type FormValidation<T> = {
  [K in keyof T]?: (value: T[K]) => string | undefined;
};

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

const loginValidation: FormValidation<LoginForm> = {
  email: (email) => {
    if (!email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Email is invalid';
  },
  password: (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
  }
};

// 5. Database/ORM Types
interface Model {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface QueryOptions<T> {
  where?: Partial<T>;
  orderBy?: {
    field: keyof T;
    direction: 'asc' | 'desc';
  };
  limit?: number;
  offset?: number;
  include?: string[];
}

// 6. Configuration Types
interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

interface AppConfig {
  port: number;
  database: DatabaseConfig;
  jwt: {
    secret: string;
    expiresIn: string;
  };
  email: {
    provider: 'smtp' | 'sendgrid' | 'ses';
    apiKey?: string;
    from: string;
  };
}

// 7. Event System Types
interface EventMap {
  'user:created': { user: UserBasic };
  'user:updated': { user: UserBasic; changes: Partial<UserBasic> };
  'user:deleted': { userId: number };
  'auth:login': { user: UserBasic; timestamp: Date };
  'auth:logout': { userId: number; timestamp: Date };
}

type EventCallback<T extends keyof EventMap> = (data: EventMap[T]) => void;

class EventEmitter {
  private listeners: { [K in keyof EventMap]?: EventCallback<K>[] } = {};

  on<T extends keyof EventMap>(event: T, callback: EventCallback<T>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  emit<T extends keyof EventMap>(event: T, data: EventMap[T]): void {
    const callbacks = this.listeners[event];
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }
}

// 8. HTTP Client Types
type ApiHttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestConfig {
  method: ApiHttpMethod;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

interface HttpClient {
  get<T>(url: string, config?: Omit<RequestConfig, 'method'>): Promise<T>;
  post<T>(url: string, data?: any, config?: Omit<RequestConfig, 'method'>): Promise<T>;
  put<T>(url: string, data?: any, config?: Omit<RequestConfig, 'method'>): Promise<T>;
  delete<T>(url: string, config?: Omit<RequestConfig, 'method'>): Promise<T>;
}

// 9. Middleware Types
interface Context {
  request: {
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: any;
  };
  response: {
    status: number;
    headers: Record<string, string>;
    body?: any;
  };
  user?: UserBasic;
}

type Middleware = (context: Context, next: () => Promise<void>) => Promise<void>;

// 10. Plugin System Types
interface PluginConfig {
  pluginName: string;
  version: string;
  enabled: boolean;
  settings?: Record<string, any>;
}

interface Plugin {
  pluginName: string;
  version: string;
  install: (app: any, config: PluginConfig) => void;
  uninstall?: (app: any) => void;
}

// 11. Cache Types
interface CacheOptions {
  ttl?: number; // Time to live in seconds
  maxSize?: number;
  strategy?: 'lru' | 'fifo' | 'lfu';
}

interface AppCache<T> {
  get(key: string): T | undefined;
  set(key: string, value: T, options?: CacheOptions): void;
  delete(key: string): boolean;
  clear(): void;
  size(): number;
}

// 12. Logger Types
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

interface Logger {
  debug(message: string, metadata?: Record<string, any>): void;
  info(message: string, metadata?: Record<string, any>): void;
  warn(message: string, metadata?: Record<string, any>): void;
  error(message: string, metadata?: Record<string, any>): void;
}

// 13. Testing Types
interface TestCase<T = any> {
  name: string;
  input: T;
  expected: any;
  setup?: () => void;
  teardown?: () => void;
}

interface MockFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T>;
  mockReturnValue(value: ReturnType<T>): this;
  mockResolvedValue(value: ReturnType<T>): this;
  mockRejectedValue(error: any): this;
  mockImplementation(fn: T): this;
  calls: Array<Parameters<T>>;
  results: Array<{ type: 'return' | 'throw'; value: any }>;
}

// 14. Real-world Usage Examples

// User Service
class UserService {
  private httpClient: HttpClient;
  private cache: AppCache<UserBasic>;
  private logger: Logger;

  constructor(httpClient: HttpClient, cache: AppCache<UserBasic>, logger: Logger) {
    this.httpClient = httpClient;
    this.cache = cache;
    this.logger = logger;
  }

  async getUser(id: number): Promise<Result<UserBasic>> {
    try {
      // Check cache first
      const cached = this.cache.get(`user:${id}`);
      if (cached) {
        this.logger.debug(`User ${id} retrieved from cache`);
        return { success: true, data: cached };
      }

      // Fetch from API
      const response = await this.httpClient.get<ApiResponse<UserBasic>>(`/users/${id}`);
      
      if (response.success) {
        // Cache the result
        this.cache.set(`user:${id}`, response.data, { ttl: 300 });
        this.logger.info(`User ${id} retrieved from API`);
        return { success: true, data: response.data };
      } else {
        return { 
          success: false, 
          error: { 
            code: 'API_ERROR', 
            message: response.message 
          } 
        };
      }
    } catch (error) {
      this.logger.error(`Failed to get user ${id}`, { error });
      return { 
        success: false, 
        error: { 
          code: 'NETWORK_ERROR', 
          message: 'Failed to fetch user' 
        } 
      };
    }
  }

  async updateUser(id: number, updates: Partial<UserBasic>): Promise<Result<UserBasic>> {
    try {
      const response = await this.httpClient.put<ApiResponse<UserBasic>>(
        `/users/${id}`, 
        updates
      );

      if (response.success) {
        // Update cache
        this.cache.delete(`user:${id}`);
        this.logger.info(`User ${id} updated successfully`);
        return { success: true, data: response.data };
      } else {
        return { 
          success: false, 
          error: { 
            code: 'UPDATE_FAILED', 
            message: response.message 
          } 
        };
      }
    } catch (error) {
      this.logger.error(`Failed to update user ${id}`, { error });
      return { 
        success: false, 
        error: { 
          code: 'NETWORK_ERROR', 
          message: 'Failed to update user' 
        } 
      };
    }
  }
}

// Usage example
async function example() {
  // This would be injected via DI in real app
  const userService = {} as UserService;

  const userResult = await userService.getUser(123);
  
  if (userResult.success) {
    console.log('User data:', userResult.data);
    
    // Update user
    const updateResult = await userService.updateUser(123, {
      profile: {
        ...userResult.data.profile,
        preferences: {
          ...userResult.data.profile.preferences,
          theme: 'dark'
        }
      }
    });
    
    if (updateResult.success) {
      console.log('User updated:', updateResult.data);
    } else {
      console.error('Update failed:', updateResult.error);
    }
  } else {
    console.error('Failed to get user:', userResult.error);
  }
}
