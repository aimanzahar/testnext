import { Client, Databases } from "node-appwrite";

const endpoint = process.env.APPWRITE_ENDPOINT;
const projectId = process.env.APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

/**
 * Creates an Appwrite Databases instance using server-only credentials.
 * Returns null if required environment values are missing so callers can
 * gracefully handle the absence of backend connectivity.
 */
export function createDatabaseClient() {
  if (!endpoint || !projectId || !apiKey) return null;

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  return new Databases(client);
}

export const databaseId =
  process.env.APPWRITE_DATABASE_ID || "mealshare_db";
export const foodListingsCollectionId =
  process.env.APPWRITE_COLLECTION_FOOD_LISTINGS || "food_listings";
