export function isValidDate(day, month, year) {
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) return false;
    if (monthNum < 1 || monthNum > 12) return false;
    const daysInMonth = new Date(yearNum, monthNum, 0).getDate(); 
    if (dayNum < 1 || dayNum > daysInMonth) return false;

    const currentDate = new Date();
    const inputDate = new Date(yearNum, monthNum - 1, dayNum);

    if (inputDate > currentDate) return false;
    
    return inputDate;
}

export function calculateAge(dateObj, unit) {
    const unitConversions = {
        Seconds: 1000,
        Minutes: 1000 * 60,
        Hours: 1000 * 60 * 60,
        Days: 1000 * 60 * 60 * 24,
        Weeks: 1000 * 60 * 60 * 24 * 7,
        Months: 1000 * 60 * 60 * 24 * 30.44, // Average month length
        Years: 1000 * 60 * 60 * 24 * 365.25, // Accounting for leap years
        Decades: 1000 * 60 * 60 * 24 * 365.25 * 10, // 10 years
    };

    const now = new Date();
    const elapsedMs = now - dateObj;

    const elapsed = elapsedMs / unitConversions[unit];
    return parseFloat(elapsed.toFixed(2));
}

