class Room {

    constructor(name, bookings, rate, discount) {
        this.name = name;
        this.bookings = [...bookings];
        this.rate = rate;
        this.discount = discount;
    }

    isOccupied(date) {
        const searchBookings = [...this.bookings]

        searchBookings.map(booking => {
            const dates = sortDates([booking.checkIn, booking.checkOut, date])
            
            if(dates[1] == date) {
                return true;
            }
        })

        return false;
    }

    occupancyPercentage(start, end) {
        let occupacy = 0;
        const allDates = getDateArray(start, end)

        allDates.map(date => {
            if(isOccupied(date)){
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

    constructor(name, email, checkIn, checkOut, discount, room) {
        this.name = name;
        this.email = email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
        this.room = room;
    }

    getFee() {
        return (this.room.price * (this.room.discount/100)) * (this.discount/100)
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
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
}