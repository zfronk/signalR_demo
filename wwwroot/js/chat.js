// Create connection
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

// Start connection
connection.start()
    .then(() => {
        console.log("Connection to Hub started!");
    })
    .catch((error) => {
        console.log("Error connecting to Hub:", error);
    });

// Function to send a message to the server (Hub)
async function SendMessageToServer() {
    const userName = document.getElementById("username").value.trim();
    const userMessage = document.getElementById("message").value.trim();

    if (!userName || !userMessage) {
        alert("Please fill in both fields.");
        return;
    }

    try {
        // Send to server -- push to HUB
        await connection.invoke("SendMessage", userName, userMessage);

        // Clear input field after sending
        document.getElementById("message").value = "";
    } catch (error) {
        console.log("Error sending message:", error);
    }
}

// Attach event listener to button
const sendMessageButton = document.getElementById("sendmessagebtn");
sendMessageButton.addEventListener("click", SendMessageToServer);

// Listen for messages from the Hub
connection.on("ReceiveMessage", (username, message) => {
    var newMessage = document.createElement("li");
    newMessage.textContent = `${username}: ${message}`;
    document.getElementById("messageslist").appendChild(newMessage);

});
