import { NgModule } from '@angular/core';
import { InitDatePipe } from './initialise-date.pipe';

@NgModule({
    declarations: [
        InitDatePipe
    ],
    exports: [
        InitDatePipe,
    ]
})
export class InitDateModule {
}
