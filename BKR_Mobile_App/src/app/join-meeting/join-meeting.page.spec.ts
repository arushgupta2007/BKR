import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JoinMeetingPage } from './join-meeting.page';

describe('JoinMeetingPage', () => {
  let component: JoinMeetingPage;
  let fixture: ComponentFixture<JoinMeetingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinMeetingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinMeetingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
