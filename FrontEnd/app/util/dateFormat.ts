export function formatDate(date: Date): string {
    const d = new Date(date);

    const formatted = d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    });
    return formatted;
}   