export function createMockRepository<T>() {
  return {
    find: async (): Promise<T[]> => [],
    findOne: async (): Promise<T | null> => null,
    save: async (entity: T): Promise<T> => entity,
    update: async (entity: T): Promise<T> => entity,
    delete: async (): Promise<void> => {},
    findOneBy: async (): Promise<T | null> => null,
    findOneOrFail: async (): Promise<T> => ({}) as T,
    create: (data) => data,
  };
}
