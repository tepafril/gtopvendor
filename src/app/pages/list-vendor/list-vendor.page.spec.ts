import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListVendorPage } from './list-vendor.page';

describe('ListVendorPage', () => {
  let component: ListVendorPage;
  let fixture: ComponentFixture<ListVendorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVendorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListVendorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
