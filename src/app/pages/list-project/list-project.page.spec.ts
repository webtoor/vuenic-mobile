import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListProjectPage } from './list-project.page';

describe('ListProjectPage', () => {
  let component: ListProjectPage;
  let fixture: ComponentFixture<ListProjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
