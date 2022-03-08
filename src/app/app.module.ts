import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';

import { storeReducer } from './state/store.reducer';
import { StoreEffects } from './state/store.effects';
import { CoffeeService } from './services/coffee.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({store: storeReducer}, {}),
    EffectsModule.forRoot([StoreEffects]),
  ],
  providers: [CoffeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
