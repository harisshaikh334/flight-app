import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeographicStatsPage } from './geographic-stats.page';

describe('GeographicStatsPage', () => {
  let component: GeographicStatsPage;
  let fixture: ComponentFixture<GeographicStatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeographicStatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeographicStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
