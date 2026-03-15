export interface MyResponse<T> {
  value: T | null;
  succeeded: boolean;
  message: string;
  statusCode: number;
}

export type user = {
  email: string;
  role: string;
};
