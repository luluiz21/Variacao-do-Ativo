import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        // Outros componentes usados no template do AppComponent devem ser declarados aqui
      ],
      imports: [
        SharedModule,
        // Outros módulos necessários
      ],
      // Importe módulos necessários aqui
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Use isso apenas se não puder declarar/importar componentes
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
