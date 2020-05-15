import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListRepairerPage } from './list-repairer.page';

describe('ListRepairerPage', () => {
  let component: ListRepairerPage;
  let fixture: ComponentFixture<ListRepairerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRepairerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListRepairerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
