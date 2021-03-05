export const formatPhoneNumber = (number) => {
    return `(${number.substring(0, 3)}) ${number.substring(3, 6)}-${number.substring(6, 10)}`;
}

export const formatMilitaryTime = (time) => {
    let hour = Number(time.substring(0, 2));
    let suffix = hour >= 12 ? "pm":"am";
    let standardHour = (hour + 11) % 12 + 1;

    return `${standardHour}:${time.substring(3,5)} ${suffix}`;
}

export const formatAvailability = (availability) => {
    let bucket = {};
    let dateKey = {1: 'M', 2: 'Tu', 3: 'W', 4: 'Th', 5: 'F'};
    let result = [];

    availability.forEach((slot) => {
        let timeAvailable = `${formatMilitaryTime(slot.startTime)} - ${formatMilitaryTime(slot.endTime)}`;
        if (!bucket.hasOwnProperty(timeAvailable)) {
            bucket[timeAvailable] = [slot.weekday];
        } else {
            bucket[timeAvailable].push(slot.weekday);
        }
    })

    Object.keys(bucket).forEach((key) => {
        let dates = '';
        bucket[key].forEach((d) => dates += dateKey[d]);
        result.push(`${dates} ${key}`)
    })

    return(result);
}