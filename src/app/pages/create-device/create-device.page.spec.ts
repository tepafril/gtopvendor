import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateDevicePage } from './create-device.page';

describe('CreateDevicePage', () => {
  let component: CreateDevicePage;
  let fixture: ComponentFixture<CreateDevicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDevicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
