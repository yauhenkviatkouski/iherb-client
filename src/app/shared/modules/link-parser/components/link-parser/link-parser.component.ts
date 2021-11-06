import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { apiErrorsSelector } from 'src/app/auth/store/selectors';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { IApiErrors } from 'src/app/shared/types/apiErrors.interface';
import { IAppState } from 'src/app/shared/types/appState.interface';
import { parseLinkAction } from '../../store/parseLink.action';
import { isSubmittingSelector, productsSelector } from '../../store/selectors';
import { IProduct } from '../../types/product.interface';

@Component({
  selector: 'app-link-parser',
  templateUrl: './link-parser.component.html',
  styleUrls: ['./link-parser.component.scss'],
})
export class LinkParserComponent implements OnInit {
  link: FormControl;
  displayedAvailableTableColumns: string[];
  displayedUnavailableTableColumns: string[];
  availableProducts: IProduct[];
  unavailableProducts: IProduct[];

  apiErrors$: Observable<IApiErrors | null>;
  isSubmitting$: Observable<boolean>;
  products$: Observable<IProduct[]>;

  constructor(private store: Store<IAppState>, private utils: UtilsService) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeForm();
  }

  initializeForm(): void {
    this.link = new FormControl(
      'https://ru.iherb.com/tr/cb?pcodes=BLB-00926qty1_NOW-00992qty2_NFS-01242qty1_SNS-02028qty1_NFS-04516qty1_SOR-01660qty1_SPS-90860qty1_CAL-57109qty1_CEN-22662qty1_CAL-86331qty1_CGN-01299qty1_NFS-01249qty2_NFS-01252qty2_CGN-01066qty1&rcode=DBB337',
      [Validators.required, Validators.pattern(/.+iherb.com/)],
    );
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.apiErrors$ = this.store.pipe(select(apiErrorsSelector));
    this.products$ = this.store.pipe(select(productsSelector));
    this.products$.subscribe((products) => {
      this.availableProducts = products.filter(
        (product) => !product.isNotAvailable,
      );
      this.unavailableProducts = products.filter(
        (product) => product.isNotAvailable,
      );
    });
    this.displayedAvailableTableColumns = [
      'image',
      'brand',
      'name',
      'qty',
      'weight',
      'regularPrice',
      'superPrice',
    ];
    this.displayedUnavailableTableColumns = ['name', 'qty'];
  }

  onSubmit(): void {
    this.store.dispatch(
      parseLinkAction({ request: { link: this.link.value } }),
    );
  }

  onDownloadClick(): void {
    this.utils.downloadCsv(
      this.availableProducts.map((product) => ({
        brand: product.brand,
        name: product.name.trim(),
        qty: product.qty,
        weight: product.weight,
        regularPrice: product.regularPrice! / 100,
        superPrice: product.superPrice ? product.superPrice / 100 : '',
      })),
      'orders',
    );
  }
}
