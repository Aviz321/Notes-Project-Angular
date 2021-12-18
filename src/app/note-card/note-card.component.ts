import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';


@Component({
    selector: 'app-note-card',
    templateUrl: './note-card.component.html',
    styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

    @Input() title: any;
    @Input() body: any;
    @Input() link: any;

    @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>()

    constructor() { }

    ngOnInit(): void {

    }

    onClickXbutton() {
        this.deleteEvent.emit();
    }

}
