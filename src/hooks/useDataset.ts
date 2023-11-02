import { useMemo } from 'react';

const useDataset = (datasets = {}) =>
  useMemo(
    () =>
      Object.entries(datasets).reduce(
        (prev, [key, value]) => ({
          ...prev,
          [`data-${key}`]: String(value),
        }),
        {}
      ),
    [datasets]
  );

export default useDataset;
