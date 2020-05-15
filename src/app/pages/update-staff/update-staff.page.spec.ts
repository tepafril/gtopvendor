import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateStaffPage } from './update-staff.page';

describe('UpdateStaffPage', () => {
  let component: UpdateStaffPage;
  let fixture: ComponentFixture<UpdateStaffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStaffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateStaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
