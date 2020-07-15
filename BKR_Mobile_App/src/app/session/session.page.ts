import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonSlides, ModalController } from '@ionic/angular';
import { ChatModalComponent } from '../components/chat-modal/chat-modal.component';
import { MeetingSessionService } from '../services/meeting-session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  data;
  obj;
  meetingName;
  meetingDesc;
  mySessionId;
  name;
  meetingCode;

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
    private modalCtrl: ModalController
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
    this.joinSession();
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

  ngOnInit() {

  }
}