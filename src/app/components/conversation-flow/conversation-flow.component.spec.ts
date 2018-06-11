import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationFlowComponent } from './conversation-flow.component';

describe('ConversationFlowComponent', () => {
  let component: ConversationFlowComponent;
  let fixture: ComponentFixture<ConversationFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
