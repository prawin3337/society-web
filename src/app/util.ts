export function formatDate(date: Date): string {
    date = new Date(date);
    const newDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    return newDate
}