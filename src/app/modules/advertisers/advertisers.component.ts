import {
  ChangeDetectorRef,
  Component,
  ViewChild,
  OnInit,
} from '@angular/core';
import { NgIf } from '@angular/common';

import SidebarComponent from './components/sidebar/sidebar.component';
import PopupComponent from '../../shared/popup/popup.component';

import AdvertisersService from '../../core/services/advertisers.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

const material = [
  MatFormFieldModule,
  MatSidenavModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
];

import { ESortDirection } from '../../core/enums/sort-direction';
import { IAdvertisers } from '../../core/DTO';

@Component({
  standalone: true,
  selector: 'app-advertisers',
  templateUrl: './advertisers.component.html',
  styleUrls: ['./advertisers.component.scss'],
  providers: [AdvertisersService],
  imports: [...material, NgIf, SidebarComponent, PopupComponent],
})
export default class AdvertisersComponent implements OnInit {
  @ViewChild('drawer', { static: false }) drawer?: MatDrawer;
  displayedColumns: string[] = ['advertiserId', 'name', 'profit'];
  list = new MatTableDataSource<IAdvertisers>();
  sortedList: IAdvertisers[] = [];
  item: IAdvertisers | undefined;
  loading: boolean = false;
  showPopup: boolean = false;
  popupMessage: string = '';

  constructor(
    private readonly advertisersService: AdvertisersService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAdvertisers();
  }

  openSidebar(row: IAdvertisers) {
    this.item = row;
    this.drawer!.open();
    this.update();
  }

  getStatus(event: string) {
    this.getAdvertisers();
    this.drawer!.close();
    this.openPopup(event);
  }

  openPopup(message: string) {
    this.popupMessage = message;
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
      this.update();
    }, 5000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.list.filter = filterValue.trim().toLowerCase();
    this.sortedList = this.list.filteredData;
  }

  sort(sort: Sort) {
    const data = [...this.list.data];

    if (!sort.active || sort.direction === '') {
      this.sortedList = data;
      return;
    }

    this.sortedList = data.sort((a, b) => {
      const isAsc = sort.direction === ESortDirection.ASC;
      if (sort.active === 'profit') {
        return this.compare(a.profit, b.profit, isAsc);
      }
      return this.compare(a.advertiserId, b.advertiserId, isAsc);
    });
  }

  private getAdvertisers() {
    this.loading = true;
    this.advertisersService.getAdvertisers().subscribe({
      next: (response) => {
        this.list.data = this.sortedList = response;
        this.loading = false;
        this.update();
      },
    });
  }

  private compare(a: number, b: number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private update(): void {
    this.cdr.detectChanges();
  }

}
