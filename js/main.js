//variables
const rooms     = document.querySelector(".rooms")
const chatList  = document.querySelector(".chat-list");
const newChat   = document.querySelector(".new-chat");
const newName   = document.querySelector(".new-name");
const updateMsg = document.querySelector(".update-msg");
const options   = document.querySelector("button.options");

//check if the local storage has a username stored in it
const username = localStorage.username ? localStorage.username : "unknown"; 

//chat room & ui instances
const chatroom = new Chatroom("general", username);
const chatUI   = new ChatUI(chatList); 
//console.log(chatroom);
//chatroom.addChat("hello my friends");

//call the getchats function and now we can inject the data to the DOM 
chatroom.getChats(data => {
    //console.log(data);
    chatUI.render(data);
});

//call the addchat function to can add new chat (new document data) to the database
newChat.addEventListener("submit", e => {
    e.preventDefault();
    const message = newChat.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChat.reset())
        .catch(error => console.log(error));
});

//call the updateName() function to can update the name in the database
newName.addEventListener("submit", e => {
    e.preventDefault();
    const name = newName.name.value.trim();
    chatroom.updateName(name);
    newName.reset();
    updateMsg.innerHTML = `your name was updated to <span class="text-success">${name}</span>`
    setTimeout(() => {
        updateMsg.innerHTML = "";
    }, 3000);
});

//call the updateRoom() function to can update the room in the database
rooms.addEventListener("click", e => {
    if(e.target.tagName = "BUTTON") {
        //clear the ui first
        chatUI.clear();     
        //second update the room
        chatroom.updateRoom(e.target.getAttribute("id"));
        //third call the getchats() function again and render the ui again
        chatroom.getChats(data => chatUI.render(data));
        //add class active to the activated room and remove this class from the rest of the rooms
        e.target.classList.add("active");
        for (let sibling of e.target.parentNode.children) {
            if (sibling !== e.target) {
                sibling.classList.remove('active');
            }
        }
    }
});

//display the new-name form when clicking on the options button
options.addEventListener("click", e => {
    e.preventDefault();
    if(options.classList.contains('display')) {
        newName.style.display = "none";
        options.classList.remove("display");
    } else {
        newName.style.display = "block";
        options.classList.add("display");
    }
});