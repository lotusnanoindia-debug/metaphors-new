CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organisation TEXT,
  sector TEXT,
  discipline TEXT,
  message TEXT NOT NULL,
  context TEXT,
  originating_page TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
