
export function parseSearch(search: string) {
    const str = search.startsWith('?') ? search.substr(1) : search;
    const split = str.split('&');
    const result : Record<string, string> = {};
    for (let i = 0; i < split.length; i += 1) {
        const splitKeyValue = split[i].split('=');
        if (splitKeyValue.length !== 2) {
            continue;
        }
        const [key, value] = splitKeyValue;
        result[key] = value;
    }
    return result;
};
