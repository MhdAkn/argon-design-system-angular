import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, timer, of, mergeMap } from 'rxjs';

@Injectable()
export class CustomPreloadingWithDelayStrategy implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        if (route.data && route.data['preload']) {
            if (route.data['delay']) {
                return timer(1000).pipe(mergeMap(() => load()));
            }
            return load();
        } else {
            return of(null);
        }
    }
} 