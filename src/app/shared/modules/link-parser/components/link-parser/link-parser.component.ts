import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { apiErrorsSelector } from 'src/app/auth/store/selectors';
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
  apiErrors$: Observable<IApiErrors | null>;
  isSubmitting$: Observable<boolean>;
  products$: Observable<IProduct[] | null>;

  constructor(private store: Store<IAppState>) {}

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
  }

  onSubmit(): void {
    this.store.dispatch(
      parseLinkAction({ request: { link: this.link.value } }),
    );
  }
}
