export async function HandleTry<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return null;
  }
}


