export interface UserType {
  name: string;
  username: string;
  created: string;
}

export interface LoginType {
  username: string;
  password: string;
}

export interface SignupType {
  name: string;
  username: string;
  password: string;
}

export type Severity = "error" | "warning" | "info" | "success";
