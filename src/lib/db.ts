import postgres from "postgres";

// use env variables in production
declare global {
  var sql: postgres.Sql<{}>;
}

let sql: postgres.Sql<{}>;
if (process.env.NODE_ENV === "production") {
  sql = postgres(process.env.POSTGRES_URL!);
} else {
  if (!global.sql) {
    global.sql = postgres({
      database: "kanban",
      user: "postgres",
      password: "790527",
    });
  }

  sql = global.sql;
}

export interface DatabaseUser {
  id: string;
  username: string;
  password_hash: string;
  github_id: number;
  google_id: number;
}

export { sql as db };
