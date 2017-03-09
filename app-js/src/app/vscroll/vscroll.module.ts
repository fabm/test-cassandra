import { NgModule, Injector } from "@angular/core";

import { routing } from "app/vscroll/vscroll.routing";
import { VscrollComponent } from "app/vscroll/vscroll.component";

@NgModule({
    imports: [routing],
    declarations: [VscrollComponent]
})
export class VscrollModule {
}