import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { MeetingSessionService } from 'src/app/services/meeting-session.service';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss'],
})
export class ChatModalComponent implements OnInit {
  connectionId:string;
  chatMessage: string;
  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    public meetingService: MeetingSessionService,
  ) { }

  ngOnInit() {
    var participant = this.navParams.get('participant');
    this.connectionId = participant.connectionId;
  }

  async dismissModal() {
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
    }
    this.meetingService.participantList[this.connectionId].chatMessages.push(chatMessage_push);
  }

  private getSelectedUser() {
    return this.meetingService.participantList[this.connectionId]
  }
}
