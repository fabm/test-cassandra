import { NgModule, Injector } from "@angular/core";

import { routing } from "app/vscroll/vscroll.routing";
import { VscrollComponent } from "app/vscroll/vscroll.component";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { DataScrollerModule } from "primeng/components/datascroller/datascroller";
import { TabViewModule } from 'primeng/components/tabview/tabview';


@NgModule({
    imports: [routing, DataTableModule, DataScrollerModule,TabViewModule],
    declarations: [VscrollComponent]
})
export class VscrollModule {
}