import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDefineObjComponent } from './news-define-obj.component';

describe('NewsDefineObjComponent', () => {
  let component: NewsDefineObjComponent;
  let fixture: ComponentFixture<NewsDefineObjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsDefineObjComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsDefineObjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
