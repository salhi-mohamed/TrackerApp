import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDashboardComponent } from './simple-dashboard.component';

describe('SimpleDashboardComponent', () => {
  let component: SimpleDashboardComponent;
  let fixture: ComponentFixture<SimpleDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimpleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
