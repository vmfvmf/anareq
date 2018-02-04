import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintNovoComponent } from './sprint-novo.component';

describe('SprintNovoComponent', () => {
  let component: SprintNovoComponent;
  let fixture: ComponentFixture<SprintNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
