import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { AppModule } from "app/app.module";
import { HomeComponent } from "app/home/home.component";

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'vscroll', loadChildren: 'app/vscroll/vscroll.module#VscrollModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);