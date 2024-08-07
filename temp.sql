CREATE TYPE task_status AS ENUM ('todo', 'doing', 'done');

CREATE TABLE boards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    sequence INTEGER NOT NULL
    -- other fields
);

CREATE TABLE columns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    board_id INTEGER NOT NULL REFERENCES boards(id)
    sequence INTEGER NOT NULL
    -- other fields
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    column_id INTEGER NOT NULL REFERENCES columns(id),
    subtasks JSON
    status TASK_STATUS DEFAULT 'todo'
    -- other fields
);


-- or embed subtasks into tasks, see above
CREATE TABLE subtasks (
    id SERIAL PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    checked BOOLEAN DEFAULT FALSE,
    task_id INTEGER NOT NULL REFERENCES tasks(id),
    sequence INTEGER NOT NULL
    -- other fields
);
