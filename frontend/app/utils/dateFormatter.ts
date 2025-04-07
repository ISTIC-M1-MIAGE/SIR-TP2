
export const formatEventDateRange = (startDateStr: string, endDateStr: string): string => {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    const sameMonth = start.getMonth() === end.getMonth();
    const sameYear = start.getFullYear() === end.getFullYear();
    const sameDay = start.getDate() === end.getDate();

    const sameDate = sameMonth && sameYear && sameDay;
    const sameYearAndMonth = sameYear && sameMonth;
    const weekdayStart = start.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase();
    const weekdayEnd = end.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase();
    const endMonth = start.toLocaleDateString('fr-FR', { month: 'long' }).toUpperCase();
    const startMonth = end.toLocaleDateString('fr-FR', { month: 'long' }).toUpperCase();
    const startDay = start.getDate();
    const endDay = end.getDate();
    const year = start.getFullYear();

    return ` ${sameDate ? weekdayStart : weekdayStart + ' ' + startDay} ${sameDate || sameMonth ? '' : startMonth} ${sameYearAndMonth ? '' : year} ${sameDate ? '' : ' - '} ${(sameDate ? '' : weekdayEnd + ' ' + endDay)} ${endMonth} ${ year}`;

};
