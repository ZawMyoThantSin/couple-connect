import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages = [
    { id: 1, sender: 'Sarah', message: 'Hey sweetie, how was your day?', timestamp: '2:30 PM' },
    { id: 2, sender: 'You', message: 'It was great! Just finished a big project at work.', timestamp: '2:32 PM' },
    { id: 3, sender: 'Sarah', message: `That's awesome! We should celebrate tonight!', timestamp: '2:33 PM' `},
    { id: 4, sender: 'You', message: 'Definitely! How about that new Italian place?', timestamp: '2:35 PM' },
    { id: 5, sender: 'Sarah', message: `Perfect! Can't wait! ❤️', timestamp: '2:36 PM' `},
  ];

  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        id: this.messages.length + 1,
        sender: 'You',
        message: this.newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.newMessage = '';
    }
  }
}
