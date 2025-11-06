CREATE TABLE IF NOT EXISTS environment_data (
  id SERIAL PRIMARY KEY,
  site VARCHAR(50),
  temperature FLOAT,
  humidity FLOAT,
  lux FLOAT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bird_counts (
  id SERIAL PRIMARY KEY,
  site VARCHAR(50),
  birds_in INT,
  birds_out INT,
  total INT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS relay_status (
  id SERIAL PRIMARY KEY,
  site VARCHAR(50),
  relay_state BOOLEAN,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
