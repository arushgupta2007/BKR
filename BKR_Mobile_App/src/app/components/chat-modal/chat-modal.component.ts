import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavParams, ModalController, IonContent } from '@ionic/angular';
import { MeetingSessionService } from 'src/app/services/meeting-session.service';
import { DomSanitizer } from '@angular/platform-browser';
var showdown = require('showdown');

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatModalComponent implements OnInit {
  connectionId:string;
  chatMessage: string = "";
  @ViewChild(IonContent) content: IonContent;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    public meetingService: MeetingSessionService,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    var participant = this.navParams.get('participant');
    this.connectionId = participant.connectionId;
    this.meetingService.setCallbackChatOther(() => {
      setTimeout(() => {
        this.content.scrollToBottom(200);
      }, 100)
    }, this.connectionId);
    this.meetingService.setCallbackLeaveOther(() => {
      this.dismissModal();
    }, this.connectionId)
  }

  async dismissModal() {
    this.meetingService.removeCallbackOther(this.connectionId, true, true);
    await this.modalCtrl.dismiss();
  }

  toggleParticipantVideo() {
    var participant = this.getSelectedUser();
    if (participant.videoStatus) {
      this.meetingService.sendUserCtrl(participant.connectionId, "video", "0");
    } else {
      this.meetingService.sendUserCtrl(participant.connectionId, "video", "1");
    }
  }

  toggleParticipantAudio() {
    var participant = this.getSelectedUser();
    if (participant.audioStatus) {
      this.meetingService.sendUserCtrl(participant.connectionId, "audio", "0");
    } else {
      this.meetingService.sendUserCtrl(participant.connectionId, "audio", "1");
    }
  }

  endParticipantCall() {
    var participant = this.getSelectedUser();
    this.meetingService.sendUserCtrl(participant.connectionId, "drop", "force");
    this.dismissModal();
  }

  sendMessage() {
    var to = this.getSelectedUser().connectionObject;
    // var chatMessage_to_send = this.getSelectedUser().name + "," + this.meetingService.user_id + "," + this.chatMessage;
    this.meetingService.sendMessage([to], this.chatMessage, "private-chat");
    var chatMessage_push = {
      from: "You",
      to: this.getSelectedUser().name,
      message: this.chatMessage,
      isSentByMe: true,
      createdAt: Date.now(),
    }
    this.getSelectedUser().chatMessages.push(chatMessage_push);
    this.chatMessage = "";
    setTimeout(() => {
      this.content.scrollToBottom(200);
    }, 100)
  }

  private getSelectedUser() {
    return this.meetingService.participantList[this.connectionId]
  }

  public convertMarkdownToHTML(markdown) {
    var converter = new showdown.Converter();
    return converter.makeHtml(markdown);
  }
}
