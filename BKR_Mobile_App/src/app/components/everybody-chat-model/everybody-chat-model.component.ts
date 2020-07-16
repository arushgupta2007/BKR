import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonContent, NavParams, ModalController } from '@ionic/angular';
import { MeetingSessionService } from 'src/app/services/meeting-session.service';
import { DomSanitizer } from '@angular/platform-browser';
var showdown = require('showdown');


@Component({
  selector: 'app-everybody-chat-model',
  templateUrl: './everybody-chat-model.component.html',
  styleUrls: ['./everybody-chat-model.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EverybodyChatModelComponent implements OnInit {
  chatMessage: string = "";
  userId: number
  @ViewChild(IonContent) content: IonContent;

  constructor(
    private modalCtrl: ModalController,
    public meetingService: MeetingSessionService,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.meetingService.setCallbackEverybodyChat(() => {
      setTimeout(() => {
        this.content.scrollToBottom(200);
      }, 100)
    })
  }

  async dismissModal() {
    await this.modalCtrl.dismiss();
  }

  sendMessage() {
    this.meetingService.sendMessage([], this.chatMessage, "chat");
    var chatMessage_push = {
      from: "You",
      to: "Everybody",
      message: this.chatMessage,
      isSentByMe: true,
      createdAt: Date.now(),
    }
    this.meetingService.chatMessagesEverybody.push(chatMessage_push);
    this.chatMessage = "";
    setTimeout(() => {
      this.content.scrollToBottom(200);
    }, 100)
  }

  public convertMarkdownToHTML(markdown) {
    var converter = new showdown.Converter();
    return converter.makeHtml(markdown);
  }

}
