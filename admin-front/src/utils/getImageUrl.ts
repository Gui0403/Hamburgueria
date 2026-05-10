export function getImageUrl(path: string) {
    return `${import.meta.env.VITE_API_URL}/storage/${path}`;
}