import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { AppModule } from "app/app.module";
import { HomeComponent } from "app/home/home.component";
import { VscrollComponent } from "app/vscroll/vscroll.component";

const routes: Routes = [
    { path: '', component: VscrollComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);