const users = []

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {

    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()
    
    // Validate the data
    if( !username && !room ) {
        return {
            error: 'Username and room are required'
        }
    }

    // checking for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    }) 

    // Validate username
    if(existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    //Store user 
    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    // splice method rmeove elements from an array and return element array of removed elements  
    if(index !== -1) {
        return users.splice(index, 1)[0]                
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

const getRooms = () => {
    const rooms = [... new Set( users.map( (user) => user.room ))]
    return rooms.sort()
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    getRooms
}


//for Development purpose
// addUser({id: 1, username: 'alex', room: 'room3'})
// addUser({id: 2, username: 'ron', room: 'room1'})
// addUser({id: 3, username: 'moni', room: 'room1'})
// addUser({id: 4, username: 'aki', room: 'room2'})
// addUser({id: 4, username: 'aki', room: 'room1'})

// console.log(getRomms())

