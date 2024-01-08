export function formatDate(date: Date): string {
    date = new Date(date);
    const newDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    return newDate
}

export function handleNullColumn (value: string | null | undefined): string {
    if(value === null || value === undefined || value === "null") {
        return "-";
    } else {
        return value;
    }
}