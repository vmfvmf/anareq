import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Sprint} from '../sprint';
import {SprintService} from '../sprint.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-sprint-lista',
    templateUrl: './sprint-lista.component.html'
})
export class SprintListaComponent implements OnInit {
    @Input() projeto_id: number;

    sprints: Sprint[];
    sprint: Sprint;

    constructor(private sprintService: SprintService, private modalService: NgbModal) {}

    ngOnInit() {
        this.getSprints();
    }

    getSprints(): void {
        this.sprintService.todos_do_projeto(this.projeto_id)
            .subscribe(sprints => this.sprints = sprints);
    }


    delete(sprint: Sprint): void {
        this.sprintService.deleta(sprint).subscribe();
        this.getSprints();
    }

    editar(content: any, s: Sprint) {
        this.sprint = s;
        this.open(content);
    }

    novo(content: any) {
        this.sprint = {projeto_id: this.projeto_id};
        this.open(content);
    }

    open(content: any) {
        this.modalService.open(content).result.then((result) => {
            switch (result) {
                case 'gravar': this.getSprints(); break;
                default: break;
            }
        }, (reason) => {
            this.getSprints();
//            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        //$route.reload();
    }


//    private getDismissReason(reason: any): string {
//        if (reason === ModalDismissReasons.ESC) {
//            return 'by pressing ESC';
//        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//            return 'by clicking on a backdrop';
//        } else {
//            return `with: ${reason}`;
//        }
//    }

}
