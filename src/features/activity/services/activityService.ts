import type { Activity } from "../types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const fetchActivities = async (): Promise<Activity[]> => {
  const url = `${apiBaseUrl}/api/activities/123/day/2025-04-26`; // Append sorting parameter
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch activities");
  }
  return response.json();
}

// Create a new activity
export const createActivity = async (activity: Activity): Promise<Activity> => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: "123", endDate: activity.endDate, data: activity }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create driver');
    }

    return response.json();
  } catch (error) {
    console.error('Error creating driver:');
    throw error; // Re-throw the error for useMutation to handle
  }
};

// Remove an activity
export const removeActivity = async (endDate: string): Promise<Activity> => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/activities/123/day/${endDate}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to remove driver');
    }

    return response.json();
  } catch (error) {
    console.error('Error removing driver:');
    throw error; // Re-throw the error for useMutation to handle
  }
};