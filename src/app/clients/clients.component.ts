import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsServices } from '../_services/clients.services';
import { Client } from '../_models/client';
import { MatPaginator, MatTableDataSource } from '../../../node_modules/@angular/material';




@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor(private clientService: ClientsServices) { }
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  ngOnInit() {
    
    this.clientService.getClients().subscribe(clients => {
      this.dataSource = new MatTableDataSource(clients);
      this.dataSource.paginator = this.paginator;
    })
  }

}
