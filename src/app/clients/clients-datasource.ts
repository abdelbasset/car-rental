import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface NewslettersItem {
  name: string;
  id: number;
  email: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: NewslettersItem[] = [
  {id: 1, name: 'Hydrogen', email: 'test'},
  {id: 2, name: 'Helium', email: 'test'},
  {id: 3, name: 'Lithium', email: 'test'},
  {id: 4, name: 'Beryllium', email: 'test'},
  {id: 5, name: 'Boron', email: 'test'},
  {id: 6, name: 'Carbon', email: 'test'},
  {id: 7, name: 'Nitrogen', email: 'test'},
  {id: 8, name: 'Oxygen', email: 'test'},
  {id: 9, name: 'Fluorine', email: 'test'},
  {id: 10, name: 'Neon', email: 'test'},
  {id: 11, name: 'Sodium', email: 'test'},
  {id: 12, name: 'Magnesium', email: 'test'},
  {id: 13, name: 'Aluminum', email: 'test'},
  {id: 14, name: 'Silicon', email: 'test'},
  {id: 15, name: 'Phosphorus', email: 'test'},

];

/**
 * Data source for the Newsletters view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class NewslettersDataSource extends DataSource<NewslettersItem> {
  data: NewslettersItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<NewslettersItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: NewslettersItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: NewslettersItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
