import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditDeviceSensorPage } from './edit-device-sensor.page';

describe('EditDeviceSensorPage', () => {
  let component: EditDeviceSensorPage;
  let fixture: ComponentFixture<EditDeviceSensorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeviceSensorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDeviceSensorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
