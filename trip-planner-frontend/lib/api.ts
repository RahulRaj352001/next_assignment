const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api";

export interface Trip {
  _id: string;
  title: string;
  destination: string;
  days: number;
  budget: number;
  createdAt: string;
}

export async function createTrip(data: Omit<Trip, "_id" | "createdAt">) {
  try {
    const res = await fetch(`${BASE_URL}/trips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to create trip: ${res.status} ${errorText}`);
    }
    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create trip: Network error");
  }
}

export async function getTrips(query = "") {
  try {
    const res = await fetch(`${BASE_URL}/trips${query}`, {
      cache: 'no-store' // Ensure fresh data for server-side rendering
    });
    
    if (!res.ok) {
      console.warn(`API call failed: ${res.status} ${res.statusText}`);
      // Return empty response structure if API fails
      return {
        items: [],
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
      };
    }
    
    const data = await res.json();
    
    // Handle both paginated and non-paginated responses
    if (data.items) {
      return data; // Already paginated response
    } else if (Array.isArray(data)) {
      // Convert array response to paginated format
      return {
        items: data,
        page: 1,
        limit: data.length,
        total: data.length,
        totalPages: 1
      };
    } else {
      // Single item response
      return {
        items: [data],
        page: 1,
        limit: 1,
        total: 1,
        totalPages: 1
      };
    }
  } catch (error) {
    console.warn('Failed to fetch trips:', error);
    // Return empty response structure if fetch fails
    return {
      items: [],
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    };
  }
}

export async function updateTrip(id: string, data: Omit<Trip, "_id" | "createdAt">) {
  try {
    const res = await fetch(`${BASE_URL}/trips/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to update trip: ${res.status} ${errorText}`);
    }
    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to update trip: Network error");
  }
}
