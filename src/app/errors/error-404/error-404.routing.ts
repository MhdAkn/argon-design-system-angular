import { Route } from '@angular/router';
// import { LayoutComponent } from 'app/layout/layout.component';
import { Error404Component } from './error-404.component';

export const error404Routes: Route[] = [
    {
        path: '',
        children: [{
            path: "", component: Error404Component,
        }],
    }
];
