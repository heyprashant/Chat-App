socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')
const $usersIcon = document.querySelector('#usersIcon')
const $backdrop =  document.querySelector('#backdrop')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

// for mobile - back drop and sidebar

$usersIcon.addEventListener('click', () => {
    $backdrop.setAttribute("style", "display: block;")
    document.querySelector('#sidebar').setAttribute("style", "display: block; transform: translateX(0);")
    // document.querySelector('#sidebar').setAttribute("class", "open")

})

$backdrop.addEventListener('click', () => {
    $backdrop.setAttribute("style", "display: none;")
    document.querySelector('#sidebar').setAttribute("style", "transform: translateX(-100%); display: none; ")
    // document.querySelector('#sidebar').setAttribute("class", "close")

})

const autoscroll = () => {
    // New message element 
    const $newMessage = $messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible Height
    const visibleHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight

    // How far i have scrolled
    const scrollOffset = $messages.scrollTop + visibleHeight

    if(containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

socket.on('message', (message) => {
    // console.log(message)
    
    // console.log(socket.id)
    const html = Mustache.render(messageTemplate, {
        msgBubble: "bubble",
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })

    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('locationMessage', (message) => {
    const html = Mustache.render(locationMessageTemplate, {
        msgBubble: "bubble",
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('roomData', (({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
      room,
      users
  })
    document.querySelector('#sidebar').innerHTML = html
}))

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const html = Mustache.render(messageTemplate, {
        msgClass: "send",
        msgBubble: "right-bubble",
        username: "Me",
        message: e.target.elements.message.value,
        createdAt: moment(new Date().getTime()).format('h:mm a')
    })

    $messages.insertAdjacentHTML('beforeend', html)
    $messages.scrollTop = $messages.scrollHeight
    

    //disable
    $messageFormButton.setAttribute('disabled', 'disabled')
    const message = e.target.elements.message.value
    
    socket.emit('sendMessage', message, (error) => {
        //enable
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if(error) {
            return console.log(error)
        }

        // console.log('Message delivered!')
    })
})

$sendLocationButton.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {

        const html = Mustache.render(locationMessageTemplate, {
            msgClass: "send",
            msgBubble: "right-bubble",
            username: 'Me',
            url: `https://google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`,
            createdAt: moment(new Date().getTime()).format('h:mm a')
        })
        $messages.insertAdjacentHTML('beforeend', html)
        $messages.scrollTop = $messages.scrollHeight

        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            // console.log('Location Shared!')
            $sendLocationButton.removeAttribute('disabled')
        })
    })
})

socket.emit('join', { username, room }, (error) => {
    if(error) {
        alert(error)
        location.href = '/'
    }
})


// document.querySelector('#sidebarCloser').addEventListener('click', () => {
//     document.querySelector('#sidebar').setAttribute("style", "display: none;")
//     $backdrop.setAttribute("style", "display: none;")
// })


