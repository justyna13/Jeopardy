const withBasePath = (path: string) =>
  `${import.meta.env.VITE_APP_BASE_URL || ''}${path}`;

export const Slugs = {
  HOME: withBasePath('/'),
  GAME: withBasePath('/game'),
  NOT_FOUND: '*'
};
