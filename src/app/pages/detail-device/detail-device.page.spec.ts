import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailDevicePage } from './detail-device.page';

describe('DetailDevicePage', () => {
  let component: DetailDevicePage;
  let fixture: ComponentFixture<DetailDevicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDevicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailDevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
