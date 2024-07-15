import postgres from "postgres";

// use env variables in production
const sql = postgres({
  database: "kanban",
  user: "postgres",
  password: "790527",
});

export interface DatabaseUser {
  id: string;
  username: string;
  password_hash: string;
  github_id: number;
}

export { sql as db };
