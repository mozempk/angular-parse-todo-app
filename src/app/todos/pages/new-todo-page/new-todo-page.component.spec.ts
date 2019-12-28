import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTodoPageComponent } from './new-todo-page.component';

describe('NewTodoPageComponent', () => {
  let component: NewTodoPageComponent;
  let fixture: ComponentFixture<NewTodoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTodoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTodoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
