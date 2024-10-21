using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.ChatHub
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task SendLogout(bool SendLogout)
        {
            await Clients.Others.SendAsync("SendLogout", SendLogout);
        }

        public async Task SendReset(bool SendReset)
        {
            await Clients.Others.SendAsync("SendReset", SendReset);
        }
    }
}
