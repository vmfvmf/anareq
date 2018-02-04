import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassoListaComponent } from './passo-lista.component';

describe('PassoListaComponent', () => {
  let component: PassoListaComponent;
  let fixture: ComponentFixture<PassoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
