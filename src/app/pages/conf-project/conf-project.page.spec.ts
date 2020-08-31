import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfProjectPage } from './conf-project.page';

describe('ConfProjectPage', () => {
  let component: ConfProjectPage;
  let fixture: ComponentFixture<ConfProjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfProjectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
