import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Providers } from './providers/main.providers';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...Providers
      ]
    };
  }
}
