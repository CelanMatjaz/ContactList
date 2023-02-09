export interface DbUser {
  id: number;
  username: string;
  password: string;
  created_at: number;
}

export interface DbContact {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  number: string;
  updated_at: number;
  created_at: number;
}
