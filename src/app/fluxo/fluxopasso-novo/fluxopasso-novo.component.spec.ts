import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassoNovoComponent } from './passo-novo.component';

describe('PassoNovoComponent', () => {
  let component: PassoNovoComponent;
  let fixture: ComponentFixture<PassoNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassoNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassoNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
