import { Account, Client, Databases } from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

let cached: {
  client: Client;
  account: Account;
  databases: Databases;
} | null = null;

/**
 * Browser-safe Appwrite client (no API key) for auth and user-owned operations.
 * Uses module-level cache to avoid re-instantiation across renders.
 */
export function getBrowserAppwrite() {
  if (!endpoint || !projectId) return null;
  if (cached) return cached;

  const client = new Client().setEndpoint(endpoint).setProject(projectId);
  cached = {
    client,
    account: new Account(client),
    databases: new Databases(client),
  };
  return cached;
}
