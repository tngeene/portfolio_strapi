function config(env) {
  let settings = {
    client: "sqlite",
    filename: process.env("DATABASE_FILENAME", ".tmp/data.db"),
  };
  let options = {
    useNullAsDefault: true,
  };

  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
    settings = {
      client: "postgres",
      host: process.env("DB_HOST"),
      port: process.env.int("DATABASE_PORT"),
      database: process.env("DATABASE_NAME"),
      username: process.env("DATABASE_USER"),
      password: process.env("DATABASE_PASSWORD"),
    };
    options = {
      ssl: process.env.bool("DATABASE_SSL", false),
    };
  }
  return [settings, options];
}

module.exports = ({ env }, [settings, options] = config(env)) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: settings,
      options: options,
    },
  },
});
