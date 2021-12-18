import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/shared/note.module';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
    selector: 'app-note-details',
    templateUrl: './note-details.component.html',
    styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

    note: Note=new Note;
    noteId: number = 0;
    new: boolean = false;

    constructor(private noteService: NotesService, private router: Router, private route: ActivatedRoute) { }
        // this.note=new Note();

    ngOnInit(): void {
        this.note=new Note();

        //find out if we are creating a new note or editing one
        this.route.params.subscribe((params: Params) => {
            if (params.id) {
                this.note = this.noteService.get(params.id);
                this.noteId=params.id;
                this.new=false;
            }
            else{
                this.new=true;
            }
        })

    }

    onSubmit(form: NgForm) {
        if(this.new){
            // save the details
        this.noteService.add(form.value);
        }
        else{
            // this.noteService.update(this.noteId, form.value.title, form.value.body);
        }
        this.router.navigateByUrl('/'); 

    }

    cancel() {
        this.router.navigateByUrl('/');

    }
}
