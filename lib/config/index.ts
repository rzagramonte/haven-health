// anything that leverages a environment variable should come out of this file

export const AppConfig = Object.freeze({
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
});
