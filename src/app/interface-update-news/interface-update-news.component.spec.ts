import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceUpdateNewsComponent } from './interface-update-news.component';

describe('InterfaceUpdateNewsComponent', () => {
  let component: InterfaceUpdateNewsComponent;
  let fixture: ComponentFixture<InterfaceUpdateNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterfaceUpdateNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterfaceUpdateNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
