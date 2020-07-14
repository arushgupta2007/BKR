import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.page.html',
  styleUrls: ['./create-meeting.page.scss'],
})
export class CreateMeetingPage implements OnInit {
  rForm: FormGroup;
  name: string = '';
  meetingName: string = '';
  meetingCode: string = '';
  meetingDesc: string = '';
  nameErr: string;
  meetingNameErr: string;
  meetingCodeErr: string;
  meetingDescErr: string;

  ngOnInit() {}
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.rForm = fb.group({
      'name_form': [null, Validators.required],
      'meetingName_form': [null, Validators.required],
      'meetingCode_form': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      'meetingDesc_form': ''
    })
  }

  alphanumeric(inputtxt) {
    var letters = /^[0-9a-zA-Z]+$/;
    return (inputtxt.match(letters)) ;
  }

  createMeeting(data) {
    this.nameErr = undefined;
    this.meetingNameErr = undefined;
    this.meetingCodeErr = undefined;

    let navigationExtras: NavigationExtras = {
      state: {
        data: data,
        obj: "create"
      }
    };
    var toPass = true;
    if (data.name_form.trim() === "") {
      this.nameErr = "Please enter a valid name! >.<";
      this.name = "";
      toPass = false;
    }

    if (data.meetingName_form.trim() === "") {
      this.meetingNameErr = "Is your meeting that boring?! o.O";
      this.meetingName = "";
      toPass = false;
    }

    if (!this.alphanumeric(data.meetingCode_form)) {
      this.meetingCodeErr = "Atleast 8 characters alphanumeric";
      this.meetingCode = "";
      toPass = false;
    }

    if (data.meetingDesc_form.length > 500) {
      this.meetingDescErr = "0 - 500 characters only!";
      this.meetingDesc = "";
      toPass = false;
    }

    if (toPass) {
      this.router.navigate(["session"], navigationExtras);
    }
  }
}
