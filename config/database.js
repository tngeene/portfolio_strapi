function config(env) {
  let settings = {
    client: "sqlite",
    filename: env("DATABASE_FILENAME", ".tmp/data.db"),
  };
  let options = {
    useNullAsDefault: true,
  };

  if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "staging"
  ) {
    settings = {
      client: "postgres",
      host: env("DB_HOST"),
      port: env.int("DB_PORT"),
      database: env("DB_NAME"),
      username: env("DB_USER"),
      password: env("DB_PASSWORD"),
    };
    options = {
      ssl: env.bool("DATABASE_SSL", false),
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
