import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PollingPage } from './polling.page';

describe('PollingPage', () => {
  let component: PollingPage;
  let fixture: ComponentFixture<PollingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PollingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
