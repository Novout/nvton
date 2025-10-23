import destr from 'destr';

export function parseKey<T = unknown>(raw: string) {
	// TODO: strict: true with error support
	return destr<T>(raw, { strict: false });
}
