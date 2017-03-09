import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VscrollComponent } from './vscroll.component';

describe('VscrollComponent', () => {
  let component: VscrollComponent;
  let fixture: ComponentFixture<VscrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VscrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VscrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
