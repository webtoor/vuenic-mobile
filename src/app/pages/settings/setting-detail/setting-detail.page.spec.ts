import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingDetailPage } from './setting-detail.page';

describe('SettingDetailPage', () => {
  let component: SettingDetailPage;
  let fixture: ComponentFixture<SettingDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
