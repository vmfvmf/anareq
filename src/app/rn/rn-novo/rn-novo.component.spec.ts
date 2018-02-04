import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RnNovoComponent } from './rn-novo.component';

describe('RnNovoComponent', () => {
  let component: RnNovoComponent;
  let fixture: ComponentFixture<RnNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RnNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RnNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
