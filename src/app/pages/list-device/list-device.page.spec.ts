import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListDevicePage } from './list-device.page';

describe('ListDevicePage', () => {
  let component: ListDevicePage;
  let fixture: ComponentFixture<ListDevicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDevicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListDevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
