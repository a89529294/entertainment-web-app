import postgres from "postgres";

// declare global {
//   var sql: postgres.Sql<{}>;
// }

// let sql: postgres.Sql<{}>;
// if (process.env.NODE_ENV === "production") {
//   sql = postgres({
//     database: "kanban",
//     user: "postgres",
//     password: "790527",
//   });
// } else {
//   if (!global.sql) {
//     global.sql = postgres({
//       database: "kanban",
//       user: "postgres",
//       password: "790527",
//     });
//   }

//   sql = global.sql;
// }

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
  google_id: number;
}

export { sql as db };
