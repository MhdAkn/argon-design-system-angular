import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../response/api-response';
import { Message } from '../../models/Message.models';

@Component({
    selector: 'app-messages-list',
    templateUrl: './messages-list.component.html',
    styleUrls: ['./messages-list.component.scss']
})

export class MmessagesListComponent implements OnInit {
    allMessages: Message[]
    constructor(
        private activateRoute: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        let _activatedRoute: { user?: ApiResponse, DataInfo?: ApiResponse } = this.activateRoute.snapshot.data
        this.allMessages = _activatedRoute.DataInfo.data
        console.log(_activatedRoute);
    }

}
