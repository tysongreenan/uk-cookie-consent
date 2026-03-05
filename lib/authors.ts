export interface Author {
  name: string;
  position: string;
  avatar: string;
}

export const authors: Record<string, Author> = {
  "cookie-banner-team": {
    name: "Cookie Banner Team",
    position: "Privacy Compliance Experts",
    avatar: "/logos/logo.svg",
  },
} as const;

export type AuthorKey = keyof typeof authors;

export function getAuthor(key: string): Author {
  return authors[key as AuthorKey] || authors["cookie-banner-team"];
}

export function isValidAuthor(key: string): key is AuthorKey {
  return key in authors;
}

