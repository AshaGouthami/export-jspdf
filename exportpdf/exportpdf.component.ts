import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator,  MatSort} from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
declare var jsPDF:any;

export interface DATA{
  id:number;
  username:string;
  email:string;
  city:string;
  company:string
}

@Component({
  selector: 'app-exportpdf',
  templateUrl: './exportpdf.component.html',
  styleUrls: ['./exportpdf.component.css']
})
export class ExportpdfComponent implements OnInit {
  dataSource;
  dataList:DATA[];
  displayedColumns: string[] = [ 'id','username', 'email', 'city','company'];
  // displayedColumns: string[] = [ 'هوية شخصية','اسم المستخدم', 'البريد الإلكتروني', 'مدينة','شركة'];

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static:true}) sort:MatSort;

  constructor(private myservices:ServiceService, private translate:TranslateService) { 
    this.fetch_userdata();
  }
  fetch_userdata(){
    this.dataSource= this.myservices.getuserdata().subscribe((dataList:DATA[])=>{
       this.dataList=dataList;
       this.dataSource=new MatTableDataSource(dataList);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort=this.sort;
    });
  }

  ngOnInit() {}
  
  downloadpdf(){
    var head=[["Id","Name","State"]];
    var body=[
      [1,"Asha","AP"],
      [2,"Tulasi","TS"],
      [3,"Bhavya","CP"]
    ]
    // var head=[["ఐడి","పేరు","రాష్ట్ర"]];
    // var body=[
    //   [1,"ఆశా","ఒక"],
      // [2,"Tulasi","TS"],
      // [3,"Bhavya","CP"]
    // ]
  var doc = new jsPDF('p', 'pt');
  doc.autoTable({head:head,body:body})
  // doc.autoTable(head,body)
  // doc.autoTable({
  //               head:[['Id','Name','State']],
  //               body:[
  //                 [1,'Asha','AP'],
  //                 [2,'Tulasi','TS'],
  //                 [3,'Bhavya','CP']
  //               ]
  // })

  doc.save('table.pdf');
  }
  // downloadpdf(){
  //   var doc=new jsPDF('p','pt');
  //   var headers=[this.displayedColumns];
  //   var body=[];
  //   this.dataList.forEach(element=>{
  //     var temp = [element.id, element.username, element.email, element.city,element.company];
  //     body.push(temp);
  //     console.log('temp==>',temp);
  //   });
  //     headers[0].forEach(x=>{
  //     console.log(x);
  //     x=x.replace(x,this.translate.instant('data.'+x)) ;
  //     console.log(x);
  //     console.log("headers=>",headers);
      
  //     })
  //   doc.autoTable({
  //     head:headers,
  //     body: body,
  //   });
  //   console.log(headers,body);
  //   doc.save('table.pdf')
  // }
}
