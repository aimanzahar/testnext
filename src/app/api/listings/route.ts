import { NextResponse } from "next/server";
import { Query } from "node-appwrite";
import {
  createDatabaseClient,
  databaseId,
  foodListingsCollectionId,
} from "@/lib/appwrite";

export const revalidate = 0; // always fresh

export async function GET() {
  const databases = createDatabaseClient();

  if (!databases) {
    return NextResponse.json(
      { error: "Missing Appwrite configuration on server." },
      { status: 500 }
    );
  }

  try {
    const result = await databases.listDocuments(
      databaseId,
      foodListingsCollectionId,
      [
        Query.equal("status", ["AVAILABLE"]),
        Query.orderDesc("$createdAt"),
        Query.limit(12),
      ]
    );

    return NextResponse.json(result.documents);
  } catch (error) {
    console.error("Appwrite listDocuments failed", error);
    return NextResponse.json(
      { error: "Unable to load listings right now." },
      { status: 500 }
    );
  }
}
