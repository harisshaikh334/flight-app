import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeographicStatsPageRoutingModule } from './geographic-stats-routing.module';

import { GeographicStatsPage } from './geographic-stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeographicStatsPageRoutingModule
  ],
  declarations: [GeographicStatsPage]
})
export class GeographicStatsPageModule {}
