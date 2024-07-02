const { Room, Booking } =require("./index")
//Room: name, email, checkIn, checkOut, discount, room
//Booking: name, email, checkIn, checkOut, discount, room
const roomTemplate1 = {name: "A-104", rate: 360, discount: 0, bookings: []}
const roomTemplate2 = {name: "A-105", rate: 760, discount: 50, bookings: []}
const bookingTemplate1 = new Booking({name: "John", email:"johny@fakemail.com", checkIn: "2024-06-10", checkOut: "2024-06-12", discount: 0, room: roomTemplate1})
const bookingTemplate2 = new Booking({name: "John", email:"johny@fakemail.com", checkIn: "2024-06-14", checkOut: "2024-06-16", discount: 0, room: roomTemplate1})
const bookingTemplate3 = new Booking({name: "John", email:"johny@fakemail.com", checkIn: "2024-06-19", checkOut: "2024-06-20", discount: 0, room: roomTemplate1})

const bookingTemplate4 = new Booking({name: "John", email:"johny@fakemail.com", checkIn: "2024-06-12", checkOut: "2024-06-13", discount: 20, room: roomTemplate2})
const bookingTemplate5 = new Booking({name: "John", email:"johny@fakemail.com", checkIn: "2024-06-14", checkOut: "2024-06-17", discount: 0, room: roomTemplate2})
const bookingTemplate6 = new Booking({name: "John", email:"johny@fakemail.com", checkIn: "2024-06-20", checkOut: "2024-06-23", discount: 50, room: roomTemplate2})

describe("Tests about isOccupied", () => {
    const room = new Room({...roomTemplate1})
    room.bookings.push(bookingTemplate1)

    test("Room with correct data return true isOccupied", () => {
        expect(room.isOccupied("2024-06-10")).toBe(true)
    })

    test("Room with correct data return true isOccupied", () => {
        expect(room.isOccupied("2024-06-11")).toBe(true)
    })

    test("Room with correct data return true isOccupied", () => {
        expect(room.isOccupied("2024-06-12")).toBe(true)
    })

    test("Room with correct data return false isOccupied", () => {
        expect(room.isOccupied("2023-06-12")).toBe(false)
    })

    test("Room with correct data return false isOccupied", () => {
        expect(room.isOccupied("2024-06-15")).toBe(false)
    })

})

describe("Tests about occupancyPercentage", () => {

    const room = new Room({...roomTemplate1})
    room.bookings.push(bookingTemplate1)
    room.bookings.push(bookingTemplate2)
    room.bookings.push(bookingTemplate3)

    test("Room with correct data return 50", () => {
        expect(room.occupancyPercentage("2024-06-10", "2024-06-25")).toBe(50)
    })

    test("Room with correct data return 100", () => {
        expect(room.occupancyPercentage("2024-06-10", "2024-06-12")).toBe(100)
    })

    test("Room with correct data return 0", () => {
        expect(room.occupancyPercentage("2023-06-10", "2023-06-12")).toBe(0)
    })

})

describe("Tests about totalOccupancyPercentage", () => {

    const room1 = new Room({...roomTemplate1})
    room1.bookings.push(bookingTemplate1)
    room1.bookings.push(bookingTemplate2)
    room1.bookings.push(bookingTemplate3)
    const room2 = new Room({...roomTemplate2})
    room2.bookings.push(bookingTemplate4)
    room2.bookings.push(bookingTemplate5)
    room2.bookings.push(bookingTemplate6)
    
    test("Room with correct data return 81.25", () => {
        expect(Room.totalOccupancyPercentage([room1, room2],"2024-06-10", "2024-06-25")).toBe(81.25)
    })

    test("Room with correct data return 100", () => {
        expect(Room.totalOccupancyPercentage([room1, room2], "2024-06-10", "2024-06-12")).toBe(100)
    })

    test("Room with correct data return 0", () => {
        expect(Room.totalOccupancyPercentage([room1, room2],"2023-06-10", "2023-06-12")).toBe(0)
    })

})

describe("Tests about availableRooms", () => {

    const room1 = new Room({...roomTemplate1})
    room1.bookings.push(bookingTemplate1)
    const room2 = new Room({...roomTemplate2})
    room2.bookings.push(bookingTemplate6)
    
    test("Room with correct data return []", () => {
        expect(Room.availableRooms([room1, room2],"2024-06-10", "2024-06-25")).toEqual([])
    })
    
    test("Room with correct data return room2", () => {
        expect(Room.availableRooms([room1, room2], "2024-06-10", "2024-06-12")).toEqual([room2])
    })

    test("Room with correct data return room1", () => {
        expect(Room.availableRooms([room1, room2], "2024-06-15", "2024-06-20")).toEqual([room1])
    })

    test("Room with correct data return room1 and room2", () => {
        expect(Room.availableRooms([room1, room2], "2024-06-13", "2024-06-15")).toEqual([room1, room2])
    })

})

describe("Tests about getFee", () => {

    test("Booking with correct data return 360", () => {
        expect(bookingTemplate1.getFee()).toBe(360)
    })

    test("Booking with correct data return 380", () => {
        expect(bookingTemplate5.getFee()).toBe(380)
    })

    test("Booking with correct data return 304", () => {
        expect(bookingTemplate4.getFee()).toBe(304)
    })

    test("Booking with correct data return 190", () => {
        expect(bookingTemplate6.getFee()).toBe(190)
    })

})