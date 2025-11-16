import { Query } from "node-appwrite";
import {
  createDatabaseClient,
  databaseId,
  foodListingsCollectionId,
} from "@/lib/appwrite";
import { Listing } from "@/types/listing";
import { HomeClient } from "@/components/HomeClient";

async function getLatestListings(): Promise<Listing[]> {
  const db = createDatabaseClient();
  if (!db) return [];

  try {
    const res = await db.listDocuments(
      databaseId,
      foodListingsCollectionId,
      [
        Query.equal("status", ["AVAILABLE"]),
        Query.orderDesc("$createdAt"),
        Query.limit(8),
      ]
    );
    return res.documents as Listing[];
  } catch (error) {
    console.error("Failed to load listings from Appwrite", error);
    return [];
  }
}

export default async function Home() {
  const listings = await getLatestListings();
  return <HomeClient listings={listings} />;
}
