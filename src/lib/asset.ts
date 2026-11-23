const base = import.meta.env.BASE_URL;

export const asset = (path: string) => `${base}${path.replace(/^\/+/, "")}`;
