import path from 'pathe';

export const getPath = (target: string) => path.resolve(process.cwd(), target);
