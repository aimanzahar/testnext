export type Listing = {
  $id: string;
  title?: string;
  description?: string;
  category?: string;
  quantity?: string;
  expiryDate?: string;
  status?: string;
  donorName?: string;
  imageUrls?: string[];
  location?: {
    address?: string;
    latitude?: number;
    longitude?: number;
  };
  $createdAt?: string;
};
