import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PollingAddOptionsPage } from './polling-add-options.page';

describe('PollingAddOptionsPage', () => {
  let component: PollingAddOptionsPage;
  let fixture: ComponentFixture<PollingAddOptionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PollingAddOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
