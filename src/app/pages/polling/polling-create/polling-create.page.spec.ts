import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PollingCreatePage } from './polling-create.page';

describe('PollingCreatePage', () => {
  let component: PollingCreatePage;
  let fixture: ComponentFixture<PollingCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PollingCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
