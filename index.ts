
type TBooking = {
    name: string;
    email: string;
    checkIn: string;
    checkOut: string;
    discount: number;
    room: Room;
}

type TRoom = {
    name: string;
    rate: number;
    discount: number;
    bookings: Booking[]
}


class Room implements TRoom {
    
    name: string;
    rate: number;
    discount: number;
    bookings: Booking[]

    constructor({name, rate, discount, bookings}: TRoom) {
        this.name = name;
        this.bookings = [...bookings];
        this.rate = rate;
        this.discount = discount;
    }

    isOccupied(date: string) {
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

    occupancyPercentage(start: string, end: string) {
        let occupacy = 0;
        const allDates = getDateArray(start, end)

        allDates.map(date => {
            if(this.isOccupied(date)){
                occupacy++;
            }
        })

        return (occupacy/allDates.length) * 100
    }

    static totalOccupancyPercentage(rooms: Room[], start: string, end: string) {
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

    static availableRooms(rooms: Room[], start: string, end: string) {
        const availables: Room[] = []
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

class Booking implements TBooking {
    name: string;
    email: string;
    checkIn: string;
    checkOut: string;
    discount: number;
    room: Room;

    constructor({name, email, checkIn, checkOut, discount, room}: TBooking) {
        this.name = name;
        this.email = email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
        this.room = room;
    }

    getFee() {
        const roomDiscount = this.room.rate - (this.room.rate * (this.room.discount/100));
        
        return roomDiscount - (roomDiscount * (this.discount/100))
    }
}

const sortDates = (dates: Date[]) => {
    const sortedDates: Date[] = [... dates]
    sortedDates.sort((a, b) => {
        const
        dateA = new Date(a),
        dateB = new Date(b);
        
        return dateA.getTime() - dateB.getTime();
    })
    return sortedDates;
}

const getDateArray = (start: string, end: string) => {
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