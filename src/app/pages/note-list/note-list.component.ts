import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Note } from 'src/app/shared/note.module';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
    selector: 'app-note-list',
    templateUrl: './note-list.component.html',
    styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

    notes: Note[] = new Array<Note>();
    filteredNotes: Note[] = new Array<Note>();
    noteCountObj: any;
    @ViewChild('filterInput') filterInputElRef: ElementRef<HTMLInputElement> | any;


    constructor(private noteService: NotesService) { }

    ngOnInit(): void {
        //retreive all notes from service
        this.notes = this.noteService.getAll();
        this.filteredNotes = this.noteService.getAll();

    }

    deleteNote(note: Note) {
        let noteId = this.noteService.getId(note);
        this.noteService.delete(noteId);
        this.filter(this.filterInputElRef.nativeElement.value)
    }

    generateNoeURL(note: Note) {
        let noteId = this.noteService.getId(note);
        return noteId;
    }

    filter(query: any) {

        query = query.toLowerCase().trim();

        let allResults: Note[] = new Array<Note>();

        //split the search query to individual words

        let terms: any[] = query.split(' '); //split on space

        //remove duplicate search terms

        terms = this.removeDuplicates(terms);

        //compiling all relevant results into all result array

        terms.forEach(term => {
            let results: Note[] = this.relevantNotes(term);
            //append results to allresults array
            allResults = [...allResults, ...results];
        })
        //all results will include duplicate notes, so we need to remove the duplicates
        let uniqueResults = this.removeDuplicates(allResults);
        this.filteredNotes = uniqueResults;

        //now sort by relevancy
        this.sortByRlevancy(allResults);

    }

    removeDuplicates(arr: Array<any>): Array<any> {

        let uniqueResults: Set<any> = new Set<any>();
        //loop throught the array
        arr.forEach(e => uniqueResults.add(e));
        return Array.from(uniqueResults);

    }

    relevantNotes(query: any) {
        query = query.toLowerCase().trim();
        let relevantNotes = this.notes.filter(note => {
            if (note.title && note.title.toLowerCase().includes(query)) {
                return true;
            }
            if (note.body && note.body.toLowerCase().includes(query)) {
                return true;
            }
            return false;
        })
        return relevantNotes;
    }

    sortByRlevancy(searchResult: Note[]) {
        let noteCountObj: object = {}; //format - key:value =>noteId:number

        searchResult.forEach(note => {
            let noteId = this.noteService.getId(note); //get the notes id

            if (this.noteCountObj[noteId]) {
                this.noteCountObj[noteId] += 1;
            }
            else {
                this.noteCountObj[noteId] = 1;

            }
        });
        this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
            let aId = this.noteService.getId(a);
            let bId = this.noteService.getId(b);

            let aCount = this.noteCountObj[aId];
            let bCount = this.noteCountObj[bId];

            return bCount - aCount
        })
    }

}
