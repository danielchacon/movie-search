import type { Show, Info, Rating, Network } from '~~/types/Shared';

function capitalizeFirstLetter(str: string) {
  if (!str) return str;

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function transformShowToInfo(show: Show): Info {
  const keysToExtract: (keyof Show)[] = [
    'language',
    'genres',
    'status',
    'runtime',
    'rating',
    'network',
  ];

  return keysToExtract
    .map((label) => {
      let value: string | number | null | undefined = null;

      if (label in show) {
        const prop = show[label];

        if (label === 'rating') {
          value = !!prop ? (prop as unknown as Rating).average : null;
        } else if (label === 'network') {
          value = !!prop ? (prop as unknown as Network).name : null;
        } else if (Array.isArray(prop)) {
          value = prop.join(', ');
        } else if (typeof prop === 'object' && prop !== null) {
          value = JSON.stringify(prop);
        } else {
          value = prop;
        }
      }

      return { label: capitalizeFirstLetter(label), value };
    })
    .filter((item) => !!item.value);
}
