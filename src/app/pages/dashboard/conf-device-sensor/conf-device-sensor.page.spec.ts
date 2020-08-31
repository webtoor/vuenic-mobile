import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfDeviceSensorPage } from './conf-device-sensor.page';

describe('ConfDeviceSensorPage', () => {
  let component: ConfDeviceSensorPage;
  let fixture: ComponentFixture<ConfDeviceSensorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfDeviceSensorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfDeviceSensorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
