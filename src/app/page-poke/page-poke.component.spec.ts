import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePokeComponent } from './page-poke.component';

describe('PagePokeComponent', () => {
  let component: PagePokeComponent;
  let fixture: ComponentFixture<PagePokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePokeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
