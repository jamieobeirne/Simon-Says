import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceToolComponent } from './voice-tool.component';

describe('VoiceToolComponent', () => {
  let component: VoiceToolComponent;
  let fixture: ComponentFixture<VoiceToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoiceToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
