// Helper function to calculate duration between two dates
export const calculateDuration = (beginDate: string, endDate: string): string => {
    const start = new Date(beginDate);
    const end = new Date(endDate);
    const durationMs = end.getTime() - start.getTime();

    // Convert to minutes
    const minutes = Math.floor(durationMs / 60000);

    // Format as hours and minutes
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
        return `${hours}h ${remainingMinutes}m`;
    } else {
        return `${remainingMinutes}m`;
    }
};