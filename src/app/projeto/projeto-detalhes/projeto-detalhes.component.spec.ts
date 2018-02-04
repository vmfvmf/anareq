import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoDetalhesComponent } from './projeto-detalhes.component';

describe('ProjetoDetalhesComponent', () => {
  let component: ProjetoDetalhesComponent;
  let fixture: ComponentFixture<ProjetoDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetoDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
