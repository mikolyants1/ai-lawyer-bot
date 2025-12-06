export const fromMap = <T, N>(data: Map<T, N>) => {
  return Array.from(data.values());
};

export const fromSet = <T>(data: Set<T>) => {
  return Array.from(data.values());
};
