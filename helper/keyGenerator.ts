export function generateCustomId() {
    // Fixed prefix and suffix
    const prefix = "PH";
    const suffix = "-22";

    // Generate a random sequence of 7 digits
    const randomDigits = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');

    // Combine the prefix, random digits, and suffix
    const uniqueId = `${prefix}${randomDigits}${suffix}`;
    return uniqueId;
}