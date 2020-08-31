import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TableSensorPage } from './table-sensor.page';

describe('TableSensorPage', () => {
  let component: TableSensorPage;
  let fixture: ComponentFixture<TableSensorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSensorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TableSensorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
