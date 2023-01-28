import { Component, Input } from '@angular/core';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {Clipboard} from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent {
  @Input() ballot!: Ballot;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  parties = [
    'ANO 2011',
    'Občanská demokratická strana',
    'KDU-ČSL',
    'Svoboda a přímá demokracie (SPD)',
    'TOP 09',
    'Česká pirátská strana',
    'Komunistická strana Čech a Moravy',
    'Česká strana sociálně demokratická',
    'ProMOST',
    'Volte Pravý Blok - stranu za snadnou a rychlou ODVOLATELNOST politiků a státních úředníků PŘÍMO OBČANY, za NÍZKÉ daně, VYROVNANÝ rozpočet, MINIMALIZACI byrokracie, SPRAVEDLIVOU a NEZKORUMPOVANOU policii a justici, REFERENDA a PŘÍMOU demokracii WWW.CIBULKA.NET, kandidující s nejlepším protikriminálním programem PŘÍMÉ demokracie a hlubokého národního, duchovního a mravního obrození VY NEVĚŘÍTE POLITIKŮM A JEJICH NOVINÁŘŮM? NO KONEČNĚ! VĚŘME SAMI SOBĚ!!! - ale i s mnoha dalšími DŮVODY, proč bychom měli jít tentokrát VŠICHNI K VOLBÁM, ale - pokud nechceme být ZNOVU obelháni, podvedeni a okradeni - NEVOLIT ŽÁDNOU PARLAMENTNÍ TUNEL - STRANU vládnoucí (post) komunistické RUSKO - ČESKÉ totalitní FÍZLOKRACIE a jejich likvidační protinárodní politiku ČÍM HŮŘE, TÍM LÉPE!!! - jenž žádá o volební podporu VŠECHNY ČESKÉ OBČANY a daňové poplatníky, kteří chtějí změnit dnešní kriminální poměry, jejichž jsme všichni obětí, v jejich pravý opak! V BOJI MEZI DOBREM A ZLEM, PRAVDOU A LŽÍ, NELZE BÝT NEUTRÁLNÍ A PŘESTO ZŮSTAT SLUŠNÝ!!! Proto děkujeme za Vaši podporu!!! Nevěříte-li na pokoru u popravčí káry, zdá-li se vám naše kandidátka málo dokonalá nebo postrádáte-li na ní zástupce své obce nebo města a přitom MÁTE ODVAHU v této válce Lidí Dobra s vládnoucími Lidmi Zla povstat z jimi naordinovaného občanského bezvědomí, kterým nás ničí a dnešní DEMOKRATURU, SKRYTOU TOTALITU a OTROKÁŘSTVÍ VYŠŠÍHO ŘÁDU zásadním způsobem změnit, KANDIDUJTE ZA NÁS!!! Kontakt: Volte Pravý Blok www.cibulka.net, PO BOX 595, 170 00 Praha 7'
  ]

  candidates = [
    'Ing. Andrej Babiš',
    'Ing. Petr Pavel, M.A.',
    'prof. Ing. Danuše Nerudová, Ph.D.',
    'Jaroslav Bašta',
    'Mgr. Karel Janeček, MBA, Ph.D.',
    'prof. MUDr. Tomáš Zima, DrSc.'
  ]

  constructor(private clipboard: Clipboard, private _snackBar: MatSnackBar) {}

  exportAsPDF(divId: any) {
      let data = document.getElementById(divId); 
        let canvas = document.createElement('canvas');
        canvas.height = data!.clientHeight*2
        canvas.width = data!.clientWidth*2
        canvas.getContext('2d', {alpha:false}); //this + scale = less blurry text
        html2canvas(data!, { canvas: canvas, scale: 2 }).then(canvas => {
          const contentDataURL = canvas.toDataURL('image/jpeg') 
          let pdf = new jsPDF('p', 'cm', 'a5'); 
          pdf.addImage(contentDataURL, 'PNG', 0, 0, 14.8, 21);
          pdf.save('volebnilistek.pdf');   
      }); 
  }

  exportAsJPEG(divId: any) {
    let data = document.getElementById(divId); 
        let canvas = document.createElement('canvas');
        canvas.height = data!.clientHeight*2
        canvas.width = data!.clientWidth*2
        canvas.getContext('2d', {alpha:false}); //this + scale = less blurry text
    html2canvas(data!, { canvas: canvas, scale: 2 }).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/jpeg') 
      saveAs(contentDataURL, 'volebnilistek.jpg');
  }); 
  }

  remove(index: number) {
    this.ballot.occupations.splice(index, 1);
  }

  edit(index: number, $event:any) {
    this.ballot.occupations[index] = $event.value;
  }

  add($event: MatChipInputEvent) {
    if ($event.value != '')
      this.ballot.occupations.push($event.value)
    $event.chipInput!.clear();
  }

  getUrl() {
    let url = location.origin + this.ballot.toUrlParams();
    this.clipboard.copy(url);
    this._snackBar.open('URL zkopírována','Zavřít', {
      duration: 3000
    });
  }

}

export class Ballot {
  number!: number;
  function = 'prezidenta republiky';
  year: number = 2023;
  candidate!: string;
  gender!: string;
  age!: number;
  occupations: string[] = [];
  address!: string;
  isParty = false;
  party!: string;
  proposedBy!: string;
  color: string = '#ffffff';

  toUrlParams() {
    let result = '';
    if (this.number !== undefined && this.number !== null)
      result += '&number=' + this.number
    if (this.function)
      result += '&function=' + this.function
    if (this.year !== undefined && this.year !== null)
      result += '&year=' + this.year
    if (this.candidate)
      result += '&candidate=' + this.candidate
    if (this.gender)
      result += '&gender=' + this.gender
    if (this.age !== undefined && this.age !== null)
      result += '&age=' + this.age
    if (this.occupations.length != 0)
      result += '&occupations=' + this.occupations
    if (this.address)
      result += '&address=' + this.address
    if (this.isParty !== undefined)
      result += '&isParty=' + this.isParty
    if (this.party)
      result += '&party=' + this.party
    if (this.proposedBy)
      result += '&proposedBy=' + this.proposedBy
    if (this.color)
      result += '&color=' + this.color.substring(1);
    return '?' + result.substring(1).replaceAll(' ', '%20');
  }
}

function saveAs(uri:any, filename:any) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);

  } else {
      window.open(uri);
  }
}