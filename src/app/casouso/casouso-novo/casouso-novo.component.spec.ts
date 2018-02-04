import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasousoNovoComponent } from './casouso-novo.component';

describe('CasousoNovoComponent', () => {
  let component: CasousoNovoComponent;
  let fixture: ComponentFixture<CasousoNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasousoNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasousoNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
