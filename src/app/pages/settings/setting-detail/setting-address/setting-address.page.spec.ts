import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingAddressPage } from './setting-address.page';

describe('SettingAddressPage', () => {
  let component: SettingAddressPage;
  let fixture: ComponentFixture<SettingAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingAddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
