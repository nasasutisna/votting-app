import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PollingVotePage } from './polling-vote.page';

describe('PollingVotePage', () => {
  let component: PollingVotePage;
  let fixture: ComponentFixture<PollingVotePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PollingVotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
