import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PollingViewResultPage } from './polling-view-result.page';

describe('PollingViewResultPage', () => {
  let component: PollingViewResultPage;
  let fixture: ComponentFixture<PollingViewResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PollingViewResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
