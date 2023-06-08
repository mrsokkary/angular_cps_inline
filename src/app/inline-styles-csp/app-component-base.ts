import { Component, Injector, OnDestroy } from "@angular/core";

@Component({
    template: '',
})
export abstract class AppComponentBase implements OnDestroy {
    constructor(injector: Injector) {
    }

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
}
