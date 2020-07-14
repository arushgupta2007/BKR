import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateMeetingPage } from './create-meeting.page';

describe('CreateMeetingPage', () => {
  let component: CreateMeetingPage;
  let fixture: ComponentFixture<CreateMeetingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMeetingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMeetingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
