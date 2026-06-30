// All env access lives here — one place to read, one place to validate.
// Getters defer validation to first use, so importing config never throws
// (keeps unrelated modules/tests importable without every var being set).

function required(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing required env var: ${key}`);
  return v;
}

export const config = {
  get databaseUrl() {
    return required("DATABASE_URL");
  },
  get jwtSecret() {
    return required("JWT_SECRET");
  },
  jwtExpiresInSeconds: 60 * 60 * 24 * 7, // 7 days
  get port() {
    return Number(process.env.PORT ?? 3000);
  },
};
