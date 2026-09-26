import { useState, useEffect } from 'react';

export interface StorageEstimateResult {
  usageFormatted: string;
  quotaFormatted: string;
  percentUsed: number;
  isAvailable: boolean;
}

export function useStorageEstimate(): StorageEstimateResult {
  const [estimate, setEstimate] = useState<StorageEstimateResult>({
    usageFormatted: '—',
    quotaFormatted: '—',
    percentUsed: 0,
    isAvailable: false
  });

  useEffect(() => {
    let isMounted = true;

    async function checkStorage() {
      if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate) {
        try {
          const { usage, quota } = await navigator.storage.estimate();
          if (!isMounted) return;

          if (usage !== undefined && quota !== undefined && quota > 0) {
            const usageMb = (usage / (1024 * 1024)).toFixed(1);
            const quotaGb = (quota / (1024 * 1024 * 1024)).toFixed(1);
            const percent = Math.min(100, Math.round((usage / quota) * 100));

            setEstimate({
              usageFormatted: `${usageMb} MB`,
              quotaFormatted: `${quotaGb} GB`,
              percentUsed: percent,
              isAvailable: true
            });
            return;
          }
        } catch (e) {
          console.warn('Storage estimate failed:', e);
        }
      }

      if (isMounted) {
        setEstimate({
          usageFormatted: '—',
          quotaFormatted: '—',
          percentUsed: 0,
          isAvailable: false
        });
      }
    }

    checkStorage();

    return () => {
      isMounted = false;
    };
  }, []);

  return estimate;
}

export default useStorageEstimate;
