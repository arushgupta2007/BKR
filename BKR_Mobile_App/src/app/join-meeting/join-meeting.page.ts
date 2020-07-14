import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-join-meeting',
  templateUrl: './join-meeting.page.html',
  styleUrls: ['./join-meeting.page.scss'],
})
export class JoinMeetingPage implements OnInit {
  rForm: FormGroup;
  name: string = '';
  meetingId: string = '';
  meetingCode: string = '';
  nameErr: string;
  meetingErr: string;
  SERVER_URL = "https://192.168.1.16:5442";

  ngOnInit() { }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpClient: HttpClient,
  ) {
    this.rForm = fb.group({
      'name_form': [null, Validators.required],
      'meetingId_form': [null, Validators.required],
      'meetingCode_form': [null, Validators.required],
    })
  }

  joinMeeting(data) {
    this.nameErr = undefined;
    this.meetingErr = undefined;
    let navigationExtras: NavigationExtras = {
      state: {
        data: data,
        obj: "join"
      }
    }
    var postData = {
      meetingId: data.meetingId_form,
      meetingCode: data.meetingCode_form,
    }
    if (data.name_form.trim() === "") {
      this.nameErr = "Please enter a valid name! >.<";
      this.name = "";
    }

    this.httpClient.post(this.SERVER_URL + "/user-api/check-id-code/",
      postData, { responseType: "text" }).toPromise().then((res) => {
        console.log(res);
        if (res === "1") {
          this.router.navigate(["session"], navigationExtras);
        } else {
          this.meetingErr = "Looks like a wrong meeting ID or code! :(";
          this.meetingId = "";
          this.meetingCode = ""
        }
      })
  }
}
