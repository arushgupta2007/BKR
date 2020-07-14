import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, AlertController, IonSlides } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { HttpClient } from '@angular/common/http';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { OpenVidu, StreamManager, Publisher, StreamEvent, Subscriber, Session, Connection } from 'openvidu-browser';
declare var cordova;

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {
  data;
  obj;
  name: string;
  meetingName: string;
  meetingCode: string;
  meetingDesc: string;
  audio: boolean = true;
  video: boolean = true;
  OV: OpenVidu;
  session: Session;
  publisher: StreamManager;
  publisher_publisher: Publisher;
  subscribers: StreamManager[] = [];
  ANDROID_PERMISSIONS = [
    this.androidPermissions.PERMISSION.CAMERA,
    this.androidPermissions.PERMISSION.RECORD_AUDIO,
    this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS,
  ];

  mySessionId;
  @ViewChild('slides', { static: true }) slides: IonSlides;
  slidesOptions = {
    initialSlide: 2,
    speed: 200,
  };
  participantList = [];
  connections_list = [];
  SERVER_URL = "https://192.168.1.16:5442";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private httpClient: HttpClient,
    private androidPermissions: AndroidPermissions,
    public alertController: AlertController
  ) {
    this.route.queryParams.subscribe(params => {
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
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      if (this.platform.is('ios') && this.platform.is('cordova')) {
        cordova.plugins.iosrtc.registerGlobals();
      }
    });
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

  ngOnInit() {
  }

  @HostListener('window:beforeunload')
  beforeunloadHandler() {
    // On window closed leave session
    this.leaveSession();
  }

  ngOnDestroy() {
    // On component destroyed leave session
    this.leaveSession();
  }

  async shareAlert() {
    var message_alert = "Share this link: <a href='https://baatkarteraho.in/?todo=join&id_=" + this.mySessionId + "'>https://baatkarteraho.in/?todo=join&id_=" + this.mySessionId + "</a>\n OR \n Share this Meeting Id:" + this.mySessionId;
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
    this.slides.getActiveIndex().then((slideNo) => {
      // TODO: LOGIC
    })
  }

  toggleVideo() {
    if (this.session) {
      this.publisher_publisher.publishVideo(!this.video)
      this.video = !this.video;
      var audio_return = "0";
      var video_return = "0";
      if (this.audio) {
        audio_return = "1";
      }
      if (this.video) {
        video_return = "1";
      }
      this.sendStreamStatusMessage(audio_return + "," + video_return);
    }
  }

  toggleAudio() {
    if (this.session) {
      this.publisher_publisher.publishAudio(!this.audio)
      this.audio = !this.audio;
      var audio_return = "0";
      var video_return = "0";
      if (this.audio) {
        audio_return = "1";
      }
      if (this.video) {
        video_return = "1";
      }
      this.sendStreamStatusMessage(audio_return + "," + video_return);
    }
  }

  sendStreamStatusMessage(streamStatus: string) {
    this.session.signal({
      data: streamStatus,
      to: [],
      type: "streamStatus"
    }).then(() => { }).catch(err => {
      console.log(err);
    })
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---
    console.log("JOINING SESSION");


    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.session = this.OV.initSession();

    // --- 3) Specify the actions when events take place in the session ---

    // On every new Stream received...

    this.session.on('signal:userControlMessage', (event) => {
      console.log("NEW EVENT");
      console.log(event);
      // var data_split:string = event.data.split(",");
      //   console.log(data_split);
      //   if (data_split[0] === "audio") {
      //     if (data_split[1] === "0") {
      //       if (this.audio) {
      //         this.toggleAudio();
      //       }
      //     } else {
      //       if (!this.audio) {
      //         this.toggleAudio();
      //       }
      //     }
      //   } else if (data_split[0] === "video") {
      //     if (data_split === "0") {
      //       if (this.video) {
      //         this.toggleVideo();
      //       }
      //     } else {
      //       if (!this.video) {
      //         this.toggleVideo();
      //       }
      //     }
      //   } else {
      //     this.leaveSession()
      //   }
    })

    this.session.on('streamCreated', (event: StreamEvent) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video on its own
      const subscriber: Subscriber = this.session.subscribe(event.stream, undefined);
      this.subscribers.push(subscriber);
      var nickname;
      try {
        nickname = JSON.parse(subscriber.stream.connection.data).clientData;
      } catch (err) {
        nickname = JSON.parse(subscriber.stream.connection.data.split('%/%')[0]).clientData;
        // serverData = JSON.parse(this.streamManager.stream.connection.data.split('%/%')[1]).serverData;
      }
      var connection_id = subscriber.stream.connection.connectionId;
      var obj_append_particpant_list = { nickName: nickname, connection_id: connection_id }
      this.participantList.push(obj_append_particpant_list);
      this.connections_list.push(subscriber.stream.connection);
    });

    // On every Stream destroyed...
    this.session.on('streamDestroyed', (event: StreamEvent) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream.streamManager);
    });

    // --- 4) Connect to the session with a valid user token ---

    // 'getToken' method is simulating what your server-side should do.
    // 'token' parameter should be retrieved and returned by your own backend
    this.getToken().then((data) => {
      console.log("GOT SOMETHING FROM SERVER");
      console.log(typeof data);
      console.log(data);
      var token_and_sessionId = JSON.parse(data);
      var token = token_and_sessionId.token;
      this.mySessionId = token_and_sessionId.session_id;
      console.log("TOKEN: " + token);
      console.log("mySessionId: " + this.mySessionId);
      if (this.obj === "join") {
        this.meetingName = token_and_sessionId.meetingName;
        this.meetingCode = token_and_sessionId.meetingCode;
        this.meetingDesc = token_and_sessionId.meetingDesc;
      }
      this.session
        .connect(token, { clientData: this.name })
        .then(() => {
          // --- 5) Requesting and Checking Android Permissions
          if (this.platform.is('cordova')) {
            // Ionic platform
            if (this.platform.is('android')) {
              console.log('Android platform');
              this.checkAndroidPermissions()
                .then(() => this.initPublisher(this.audio, this.video))
                .catch(err => console.error(err));
            } else if (this.platform.is('ios')) {
              console.log('iOS platform');
              this.initPublisher(this.audio, this.video);
            }
          } else {
            this.initPublisher(this.audio, this.video);
          }
        })
        .catch(error => {
          console.log('There was an error connecting to the session:', error.code, error.message);
        });
    })
  }

  initPublisher(audio_input, video_input) {
    // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
    // element: we will manage it on our own) and with the desired properties
    const publisher: Publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined, // The source of audio. If undefined default microphone
      videoSource: undefined, // The source of video. If undefined default webcam
      publishAudio: audio_input, // Whether you want to start publishing with your audio unmuted or not
      publishVideo: video_input, // Whether you want to start publishing with your video enabled or not
      resolution: '640x480', // The resolution of your video
      frameRate: 30, // The frame rate of your video
      insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
      mirror: true // Whether to mirror your local video or not
    });

    // --- 6) Publish your stream ---
    this.publisher_publisher = publisher;
    this.session.publish(publisher).then(() => {
      // Store our Publisher
      this.publisher = publisher;
      console.log(typeof publisher);
      console.log(typeof this.publisher);
    });
  }

  leaveSession() {
    if (this.session) {
      this.session.disconnect();
    }
    this.subscribers = [];
    delete this.publisher;
    delete this.session;
    delete this.OV;
    this.router.navigateByUrl("/")
  }

  refreshVideos() {
    if (this.platform.is('ios') && this.platform.is('cordova')) {
      cordova.plugins.iosrtc.refreshVideos();
    }
  }

  private checkAndroidPermissions(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        this.androidPermissions
          .requestPermissions(this.ANDROID_PERMISSIONS)
          .then(() => {
            this.androidPermissions
              .checkPermission(this.androidPermissions.PERMISSION.CAMERA)
              .then(camera => {
                this.androidPermissions
                  .checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO)
                  .then(audio => {
                    this.androidPermissions
                      .checkPermission(this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS)
                      .then(modifyAudio => {
                        if (camera.hasPermission && audio.hasPermission && modifyAudio.hasPermission) {
                          resolve();
                        } else {
                          reject(
                            new Error(
                              'Permissions denied: ' +
                              '\n' +
                              ' CAMERA = ' +
                              camera.hasPermission +
                              '\n' +
                              ' AUDIO = ' +
                              audio.hasPermission +
                              '\n' +
                              ' AUDIO_SETTINGS = ' +
                              modifyAudio.hasPermission,
                            ),
                          );
                        }
                      })
                      .catch(err => {
                        console.error(
                          'Checking permission ' +
                          this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS +
                          ' failed',
                        );
                        reject(err);
                      });
                  })
                  .catch(err => {
                    console.error(
                      'Checking permission ' + this.androidPermissions.PERMISSION.RECORD_AUDIO + ' failed',
                    );
                    reject(err);
                  });
              })
              .catch(err => {
                console.error('Checking permission ' + this.androidPermissions.PERMISSION.CAMERA + ' failed');
                reject(err);
              });
          })
          .catch(err => console.error('Error requesting permissions: ', err));
      });
    });
  }

  private deleteSubscriber(streamManager: StreamManager): void {
    const index = this.subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }

  getToken(): Promise<string> {
    if (this.obj === "create") {
      var postData_create = {
        "userName": this.name,
        "meetingName": this.meetingName,
        "meetingCode": this.meetingCode,
        "meetingDesc": this.meetingDesc,
        "userId": "",
      }
      return this.httpClient.post(this.SERVER_URL + "/mobile-api/create-meeting-get-token",
        postData_create, { responseType: 'text' })
        .toPromise()
    } else if (this.obj === "join") {
      var postData_join = {
        "userName": this.name,
        "meetingId": this.mySessionId,
        "meetingCode": this.meetingCode,
        "userId": "",
      }
      return this.httpClient.post(this.SERVER_URL + "/mobile-api/join-meeting-and-get-token/",
        postData_join, { responseType: 'text' }).toPromise()
    }
  }

}
