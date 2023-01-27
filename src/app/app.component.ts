import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ballot } from './generator/generator.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ballot = new Ballot;

  constructor(private route: ActivatedRoute) {
    
  }

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => {
        if (params['function'] !== undefined)
          this.ballot.function = params['function'];
        if (params['year'] !== undefined)
          this.ballot.year = params['year'];
        if (params['number'] !== undefined)
          this.ballot.number = params['number'];
        if (params['candidate'] !== undefined)
          this.ballot.candidate = params['candidate'];
        if (params['gender'] !== undefined)
          this.ballot.gender = params['gender'];
        if (params['age'] !== undefined)
          this.ballot.age = params['age'];
        if (params['occupations'] !== undefined)
          this.ballot.occupations = params['occupations'].split(',');
        if (params['address'] !== undefined)
          this.ballot.address = params['address'];
        if (params['isParty'] !== undefined)
          this.ballot.isParty = params['isParty'] == 'true';
        if (params['party'] !== undefined)
          this.ballot.party = params['party'];
        if (params['proposedBy'] !== undefined)
          this.ballot.proposedBy = params['proposedBy'];
        if (params['color'] !== undefined)
          this.ballot.color = '#' + params['color'];
      }
    );
  }
}
