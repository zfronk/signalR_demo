using Microsoft.AspNetCore.SignalR;

namespace SignalR_Demo.Hubs
{
    public class ChatHub : Hub
    {
        // When method is called by clients
        public async Task SendMessage(string username , string message)
        {
            // Wait for all clients to recieve message
            await Clients.All.SendAsync("ReceiveMessage" , username , message);

        }

    }
}
