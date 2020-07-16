import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EverybodyChatModelComponent } from './everybody-chat-model.component';

describe('EverybodyChatModelComponent', () => {
  let component: EverybodyChatModelComponent;
  let fixture: ComponentFixture<EverybodyChatModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EverybodyChatModelComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EverybodyChatModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
