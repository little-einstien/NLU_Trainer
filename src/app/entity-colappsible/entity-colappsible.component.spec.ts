import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityColappsibleComponent } from './entity-colappsible.component';

describe('EntityColappsibleComponent', () => {
  let component: EntityColappsibleComponent;
  let fixture: ComponentFixture<EntityColappsibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityColappsibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityColappsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
