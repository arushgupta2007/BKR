import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonSlides, ModalController, Platform } from '@ionic/angular';
import { ChatModalComponent } from '../components/chat-modal/chat-modal.component';
import { MeetingSessionService } from '../services/meeting-session.service';
import { EverybodyChatModelComponent } from '../components/everybody-chat-model/everybody-chat-model.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  data;
  obj: string;
  meetingName: string;
  meetingDesc: string;
  mySessionId: string;
  name: string;
  meetingCode: string;
  layoutNo: number = 6;
  video_styles = {};

  @ViewChild('slides', { static: true }) slides: IonSlides;
  slidesOptions = {
    initialSlide: 1,
    speed: 200,
  };
  constructor(
    public meetingService: MeetingSessionService,
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    private modalCtrl: ModalController,
    private platform: Platform,
    private screenOrientation: ScreenOrientation
  ) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.data;
        this.obj = this.router.getCurrentNavigation().extras.state.obj;
        this.initApp();
      } else {
        this.router.navigateByUrl("/")
      }
    });
  }

  initApp() {
    if (this.obj === "create") {
      this.meetingName = this.data.meetingName_form;
      this.meetingDesc = this.data.meetingDesc_form;
    } else {
      this.mySessionId = this.data.meetingId_form;
    }
    this.name = this.data.name_form;
    this.meetingCode = this.data.meetingCode_form;
    this.meetingService.setCallbackSomeoneJoinLeave(() => { this.layoutManager() })
    this.joinSession();
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  @HostListener('window:beforeunload')
  beforeunloadHandler() {
    this.meetingService.leaveSession();
  }

  ngOnDestroy() {
    this.meetingService.leaveSession();
  }

  joinSession() {
    if (this.obj === "create") {
      this.meetingService.getTokenCreate(this.name, this.meetingName, this.meetingCode, this.meetingDesc)
        .then((data) => {
          var json_data = JSON.parse(data);
          this.meetingService.joinSession(json_data, this.obj, json_data.user_id);
        })
    } else {
      this.meetingService.getTokenJoin(this.name, parseInt(this.mySessionId), this.meetingCode)
        .then((data) => {
          var json_data = JSON.parse(data);
          this.meetingService.joinSession(json_data, this.obj, json_data.user_id);
        })
    }
    this.meetingService.setCallbackLeaveSession(() => {
      this.router.navigateByUrl("/");
    });
    this.meetingService.setCallbackVariables((meetingName, meetingCode, meetingId, meetingDesc) => {
      this.meetingName = meetingName;
      this.meetingCode = meetingCode;
      this.mySessionId = meetingId;
      this.meetingDesc = meetingDesc;
    })
    this.meetingName = this.meetingService.meetingName;
    this.meetingCode = this.meetingService.meetingCode;
    this.meetingDesc = this.meetingService.meetingDesc;
  }

  async openChatModal(participant) {
    const chat_modal = await this.modalCtrl.create({
      component: ChatModalComponent,
      componentProps: {
        participant: participant
      }
    });
    chat_modal.present();
  }

  async openEverybodyModal() {
    const eb_modal = await this.modalCtrl.create({
      component: EverybodyChatModelComponent,
    })
    eb_modal.present();
  }

  async shareAlert() {
    var message_alert = `Share this link: 
      <a href='https://baatkarteraho.in/?todo=join&id_=${this.meetingService.mySessionId}'>
        https://baatkarteraho.in/?todo=join&id_=${this.meetingService.mySessionId}
      </a>
      <br>OR<br>
      Share this Meeting Id: ${this.meetingService.mySessionId}`;
    const alert = await this.alertController.create({
      cssClass: "alert-message",
      header: "Share " + this.meetingName,
      message: message_alert,
      buttons: ["OK"]
    })
    await alert.present();
  }

  goToSlide(slideNo: number) {
    this.slides.slideTo(slideNo, 200)
  }

  slideChanged() {
    this.slides.getActiveIndex().then(() => {
      // TODO: LOGIC
    })
  }

  layoutManager() {
    var no_participants: number = Object.keys(this.meetingService.participantList).length + 1;
    var toolbarHeight = 56;
    var offset = 15;
    var video_height;
    if (no_participants === 1) {
      this.layoutNo = 12;
      video_height = this.platform.height() - toolbarHeight;
    } else if (no_participants === 2) {
      this.layoutNo = 12;
      video_height = ((this.platform.height() - toolbarHeight) / 2) - offset
    } else if (no_participants >= 3) {
      this.layoutNo = 6;
      video_height = ((this.platform.height() - toolbarHeight) / 2) - offset;
    }
    this.video_styles = {
      'height.px': video_height.toString()
    }
  }

  toggleFullscreen(elemId: string) {
    var elem = document.getElementById(elemId);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    }
  }

  ngOnInit() {

  }
}