import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RnListaComponent } from './rn-lista.component';

describe('RnListaComponent', () => {
  let component: RnListaComponent;
  let fixture: ComponentFixture<RnListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RnListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RnListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
