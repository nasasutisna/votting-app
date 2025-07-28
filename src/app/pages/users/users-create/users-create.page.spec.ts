import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersCreatePage } from './users-create.page';

describe('UsersCreatePage', () => {
  let component: UsersCreatePage;
  let fixture: ComponentFixture<UsersCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
