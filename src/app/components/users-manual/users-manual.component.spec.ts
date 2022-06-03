import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManualComponent } from './users-manual.component';

describe('UsersManualComponent', () => {
  let component: UsersManualComponent;
  let fixture: ComponentFixture<UsersManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersManualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
