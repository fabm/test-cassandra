import { Component } from "@angular/core";

@Component({
    selector: 'app-root',
    template: `
    <p>Angular tests</p>
    <a routerLink="home">home</a>
    <a routerLink="vscroll">vscroll</a>
    <router-outlet></router-outlet>
    `
})
export class AppComponent{}