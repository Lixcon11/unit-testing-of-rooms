class Room {

    constructor(obj) {
        this.name = obj.name;
        this.bookings = [...obj.bookings];
        this.rate = obj.rate;
        this.discount = obj.discount;
    }

    isOccupied(date) {
        const searchBookings = [...this.bookings]
        const newDate = new Date(date);

        for(let booking of searchBookings) {
            const checkIn = new Date(booking.checkIn);
            const checkOut = new Date(booking.checkOut);
            const dates = sortDates([checkIn, checkOut, newDate])

            if(dates[1].getTime() === newDate.getTime()) {
                return true;
            }
        }

        return false;
    }

    occupancyPercentage(start, end) {
        let occupacy = 0;
        const allDates = getDateArray(start, end)

        allDates.map(date => {
            if(this.isOccupied(date)){
                occupacy++;
            }
        })

        return (occupacy/allDates.length) * 100
    }

    static totalOccupancyPercentage(rooms, start, end) {
        let occupacy = 0;
        const allDates = getDateArray(start, end)

        allDates.map(date => {

            for(let room of rooms) {
                if(room.isOccupied(date)) {
                    occupacy++;
                    break;
                }
            }
        })

        return (occupacy/allDates.length) * 100
    }

    static availableRooms(rooms, start, end) {
        const availables = []
        const allDates = getDateArray(start, end)
        rooms.map(room => {
            let free = true

            for(let date of allDates) {
                if(room.isOccupied(date)) {
                    free = false
                    break;
                }
            }
            if(free){
                availables.push(room);
            }
        })

        return availables;
    }
}

class Booking {

    constructor(obj) {
        this.name = obj.name;
        this.email = obj.email;
        this.checkIn = obj.checkIn;
        this.checkOut = obj.checkOut;
        this.discount = obj.discount;
        this.room = obj.room;
    }

    getFee() {
        const roomDiscount = this.room.rate - (this.room.rate * (this.room.discount/100));
        
        return roomDiscount - (roomDiscount * (this.discount/100))
    }
}

const sortDates = (dates) => {
    const sortedDates = [... dates]
    sortedDates.sort((a, b) => {
        const
        dateA = new Date(a),
        dateB = new Date(b);
        
        return dateA - dateB;
    })
    return sortedDates;
}

const getDateArray = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const arr = new Array();
    const dt = new Date(startDate);
    while (dt <= endDate) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
}

module.exports = { Room, Booking }