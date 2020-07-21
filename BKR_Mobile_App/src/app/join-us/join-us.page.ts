import { Component, OnInit } from '@angular/core';
import { OauthService } from '../services/oauth.service';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.page.html',
  styleUrls: ['./join-us.page.scss'],
})
export class JoinUsPage implements OnInit {
  user;
  constructor(private oauthService: OauthService) { }

  ngOnInit() {}

  joinWithGoogle() {
    this.oauthService.joinWithGoogle();
  }

}
