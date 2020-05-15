import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailStaffPage } from './detail-staff.page';

describe('DetailStaffPage', () => {
  let component: DetailStaffPage;
  let fixture: ComponentFixture<DetailStaffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailStaffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailStaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
