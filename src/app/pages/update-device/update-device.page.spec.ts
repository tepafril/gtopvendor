import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateDevicePage } from './update-device.page';

describe('UpdateDevicePage', () => {
  let component: UpdateDevicePage;
  let fixture: ComponentFixture<UpdateDevicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDevicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateDevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
