import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeographicStatsPage } from './geographic-stats.page';

const routes: Routes = [
  {
    path: '',
    component: GeographicStatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeographicStatsPageRoutingModule {}
