export function add(a, b) {
    return a + b;
}

export function isEven(num) {
    return num % 2 === 0;
}

export function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}
