export function encodeQuery(queryObject) {
    return Object.entries(queryObject)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&');
}