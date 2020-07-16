import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { OpenVidu, StreamManager, Publisher, Session, SignalEvent, StreamEvent, Subscriber, ConnectionEvent } from 'openvidu-browser';
import { Participant } from '../inerfaces/partipant-session'
import { ChatMessage } from '../inerfaces/chat-message';
declare var cordova;

@Injectable({
  providedIn: 'root'
})
export class MeetingSessionService {
  public name: string;
  public meetingName: string;
  public meetingCode: string;
  public meetingDesc: string;
  public user_id: number;
  public audio: boolean = true;
  public video: boolean = true;
  public OV: OpenVidu;
  public session: Session;
  public publisher: StreamManager;
  public publisher_publisher: Publisher;
  public chatMessagesEverybody: ChatMessage[] = [];
  callbackAfterSessionLeave;
  callbackVariables;
  callbackChatListners = {};
  callbackLeaveListners = {};
  callbackEverybodyChat;
  callbackSomeoneJoinLeave;

  ANDROID_PERMISSIONS = [
    this.androidPermissions.PERMISSION.CAMERA,
    this.androidPermissions.PERMISSION.RECORD_AUDIO,
    this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS,
  ];

  public mySessionId;
  public participantList: { [id: string]: Participant } = {};
  SERVER_URL = "https://192.168.1.16:5442";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private httpClient: HttpClient,
    private androidPermissions: AndroidPermissions,
  ) {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      if (this.platform.is('ios') && this.platform.is('cordova')) {
        cordova.plugins.iosrtc.registerGlobals();
      }
    });
  }

  joinSession(data_recv_server: any, obj: string, client_id: number) {
    console.log("JOINING SESSION");

    this.OV = new OpenVidu();
    this.session = this.OV.initSession();
    this.session.on('signal:userControlMessage', (event: SignalEvent) => {
      var data_split = event.data.split(",");
      this.ETUserControl(data_split);
    })
    this.session.on('signal:streamStatus', (event: SignalEvent) => {
      var connection_id = event.from.connectionId;
      if (this.participantList[connection_id]) {
        var data = event.data.split(",");
        this.participantList[connection_id].audioStatus = data[0] === "1";
        this.participantList[connection_id].videoStatus = data[1] === "1";
      }
    })
    this.session.on('signal:private-chat', (event: SignalEvent) => {
      var from_connectionId = event.from.connectionId;
      if (this.participantList[from_connectionId]) {
        var message_append = {
          from: this.participantList[from_connectionId].name,
          to: this.name,
          message: event.data,
          isSentByMe: false,
          createdAt: Date.now(),
        }
        this.participantList[from_connectionId].chatMessages.push(message_append)
        if (this.callbackChatListners[from_connectionId]) {
          this.callbackChatListners[from_connectionId]();
        }
      }
    })
    this.session.on('signal:chat', (event: SignalEvent) => {
      var from_connection_id = event.from.connectionId;
      var seprated_values = event.data.split(",");
      var from_id = seprated_values[0];
      var message_to_slice = event.data.slice(event.data.indexOf(","), event.data.length);
      var message = message_to_slice.slice(message_to_slice.indexOf(",") + 1, message_to_slice.length);
      if (from_id !== this.user_id.toString()) {
        var message_obj = {
          from: this.participantList[from_connection_id].name,
          to: 'Everybody',
          message: message,
          isSentByMe: false,
          createdAt: Date.now()
        }
        this.chatMessagesEverybody.push(message_obj);
      }
      if (this.callbackEverybodyChat) {
        this.callbackEverybodyChat();
      }
    })
    this.session.on('streamCreated', (event: StreamEvent) => {
      const subscriber: Subscriber = this.session.subscribe(event.stream, undefined);
      var nickname;
      try {
        nickname = JSON.parse(subscriber.stream.connection.data).clientData;
      } catch (err) {
        nickname = JSON.parse(subscriber.stream.connection.data.split('%/%')[0]).clientData;
        // serverData = JSON.parse(this.streamManager.stream.connection.data.split('%/%')[1]).serverData;
      }
      var connection_id = subscriber.stream.connection.connectionId;
      var participant_obj: Participant = {
        name: nickname,
        connectionId: connection_id,
        chatMessages: [],
        videoStatus: true,
        audioStatus: true,
        connectionObject: subscriber.stream.connection,
        subscriberObject: subscriber
      }
      this.participantList[connection_id] = participant_obj;
      if (this.callbackSomeoneJoinLeave) {
        this.callbackSomeoneJoinLeave();
      }
    });
    this.session.on('streamDestroyed', (event: StreamEvent) => {
      delete this.participantList[event.stream.connection.connectionId];
      if (this.callbackLeaveListners[event.stream.connection.connectionId]) {
        this.callbackLeaveListners[event.stream.connection.connectionId]();
      }
      if (this.callbackSomeoneJoinLeave) {
        this.callbackSomeoneJoinLeave();
      }
    });

    this.session.on("connectionDestroyed", (event: ConnectionEvent) => {
      delete this.participantList[event.connection.connectionId];
      if (this.callbackLeaveListners[event.connection.connectionId]) {
        this.callbackLeaveListners[event.connection.connectionId]();
      }
      if (this.callbackSomeoneJoinLeave) {
        this.callbackSomeoneJoinLeave();
      }
    })

    var token = data_recv_server.token;
    this.mySessionId = data_recv_server.session_id;
    this.user_id = client_id;
    if (obj === "join") {
      this.meetingName = data_recv_server.meetingName;
      this.meetingCode = data_recv_server.meetingCode;
      this.meetingDesc = data_recv_server.meetingDesc;
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
        if (this.callbackVariables) {
          this.callbackVariables(this.meetingName, this.meetingCode, this.mySessionId, this.meetingDesc);
        }
        if (this.callbackSomeoneJoinLeave) {
          this.callbackSomeoneJoinLeave();
        }
      })
      .catch(error => {
        console.log('There was an error connecting to the session:', error.code, error.message);
      });
  }

  initPublisher(audio_input, video_input) {
    if (this.OV) {
      const publisher: Publisher = this.OV.initPublisher(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: audio_input,
        publishVideo: video_input,
        resolution: '640x480',
        frameRate: 30,
        insertMode: 'APPEND',
        mirror: true
      });

      this.publisher_publisher = publisher;
      this.session.publish(publisher).then(() => {
        this.publisher = publisher;
        console.log(typeof publisher);
        console.log(typeof this.publisher);
      });
    }
  }

  leaveSession() {
    if (this.session) {
      this.session.disconnect();
    }

    if (this.callbackAfterSessionLeave) {
      this.callbackAfterSessionLeave();
    }
    delete this.publisher;
    delete this.session;
    delete this.OV;
  }

  getTokenCreate(name: string, meetingName: string, meetingCode: string, meetingDesc: string) {
    console.log("Getting Token Create");
    this.name = name;
    this.meetingName = meetingName;
    this.meetingCode = meetingCode;
    this.meetingDesc = meetingDesc;
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
  }

  getTokenJoin(name: string, meetingId: number, meetingCode: string) {
    console.log("Getting Token Join");
    this.name = name;
    this.mySessionId = meetingId;
    this.meetingCode = meetingCode;
    var postData_join = {
      "userName": this.name,
      "meetingId": this.mySessionId,
      "meetingCode": this.meetingCode,
      "userId": "",
    }
    return this.httpClient.post(this.SERVER_URL + "/mobile-api/join-meeting-and-get-token/",
      postData_join, { responseType: 'text' }).toPromise()
  }

  ETUserControl(data_split) {
    console.log(data_split);
    if (data_split[0] === "audio") {
      if (data_split[1] === "0") {
        if (this.audio) {
          this.toggleAudio();
        }
      } else {
        if (!this.audio) {
          this.toggleAudio();
        }
      }
    } else if (data_split[0] === "video") {
      if (data_split[1] === "0") {
        if (this.video) {
          this.toggleVideo();
        }
      } else {
        if (!this.video) {
          this.toggleVideo();
        }
      }
    } else {
      this.leaveSession()
    }
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

  sendUserCtrl(connection_id: string, type: string, value: string) {
    if (this.participantList[connection_id]) {
      this.session.signal({
        data: type + "," + value,
        to: [this.participantList[connection_id].connectionObject],
        type: "userControlMessage"
      })
    }
  }

  removeParticipant(participant: Participant) {
    this.session.signal({
      data: "drop,force",
      to: [participant.connectionObject],
      type: "userControlMessage",
    })
  }

  refreshVideos() {
    if (this.platform.is('ios') && this.platform.is('cordova')) {
      cordova.plugins.iosrtc.refreshVideos();
    }
  }

  setCallbackVariables(callback) {
    this.callbackVariables = callback;
  }

  setCallbackSomeoneJoinLeave(callback) {
    this.callbackSomeoneJoinLeave = callback;
  }

  setCallbackChatOther(callback, connection_id) {
    this.callbackChatListners[connection_id] = callback;
  }

  setCallbackLeaveOther(callback, connection_id) {
    this.callbackLeaveListners[connection_id] = callback;
  }

  setCallbackEverybodyChat(callback) {
    this.callbackEverybodyChat = callback;
  }

  removeCallbackEverybodyChat() {
    this.callbackEverybodyChat = undefined;
  }

  setCallbackLeaveSession(callback) {
    this.callbackAfterSessionLeave = callback;
  }

  removeCallbackOther(connection_id: string, chat: boolean = true, leave: boolean = true) {
    if (chat) {
      delete this.callbackChatListners[connection_id];
    }
    if (leave) {
      delete this.callbackLeaveListners[connection_id];
    }
  }

  sendMessage(to: any, data: string, type: string) {
    var new_data = data;
    if (type === "chat") {
      new_data = this.user_id + "," + data
    }
    this.session.signal({
      data: new_data,
      to: to,
      type: type,
    }).then(() => {
      if (type === "chat") {
        var data = {
          sessionId: this.mySessionId,
          from: this.name,
          from_account: "",
          to: "Everyone",
          message: data,
        }
        this.httpClient.post(this.SERVER_URL + "/session/saveMessage/", 
            data, { responseType: 'text' });
      }
    })
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

}
