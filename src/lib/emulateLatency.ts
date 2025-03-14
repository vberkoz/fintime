// Helper function to emulate latency
export const emulateLatency = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};