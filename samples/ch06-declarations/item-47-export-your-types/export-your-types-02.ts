interface SecretName {
  first: string;
  last: string;
}

interface SecretSanta {
  name: SecretName;
  gift: string;
}

export function getGift(name: SecretName, gift: string): SecretSanta {
  // COMPRESS
  return {
    name: {
      first: 'Dan',
      last: 'Van',
    },
    gift: 'MacBook Pro',
  };
  // END
}

type MySanta = ReturnType<typeof getGift>;  // SecretSanta
type MyName = Parameters<typeof getGift>[0];  // SecretName
