using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace ExampleSignalR
{
    public class ChatHub : Hub
    {
        private static List<string> Messages { get; set; } = new List<string>();

        public void Send(string message)
        {
            var msg = string.Format("[User:{0}]: {1}", Context.ConnectionId, message);

            Clients.All.newMessage(msg);
        }

        public override Task OnConnected()
        {
            Clients.Caller.init(Context.ConnectionId, Messages);

            return base.OnConnected();
        }

    }
}