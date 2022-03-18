"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductListComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var table_1 = require("@angular/material/table");
var layout_1 = require("@angular/cdk/layout");
var store_selectors_1 = require("src/app/state/store.selectors");
var store_actions_1 = require("src/app/state/store.actions");
// import { ChangeDetectionStrategy} from '@angular/compiler';
var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(store, responsive) {
        var _this = this;
        this.store = store;
        this.responsive = responsive;
        this.hideHeroImage$ = false;
        this.length = 10;
        this.pageSize = 10;
        this.pageSizeOptions = [10, 25, 50];
        this.displayedColumns = ['id', 'blend_name', 'origin', 'variety', 'intensifier', 'action'];
        this.dataSource = new table_1.MatTableDataSource([]); // using MatTableDataSource since it can work with MatPaginator to listen for page changes
        this.allCoffeeProducts$ = this.store.select(store_selectors_1.selectAllProducts).subscribe(function (val) {
            _this.dataSource.data = val;
        });
    }
    ProductListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.dispatch(store_actions_1.loadProducts());
        // responsive response UI changes logic
        this.responsive.observe([
            layout_1.Breakpoints.XSmall,
            layout_1.Breakpoints.Small,
            layout_1.Breakpoints.Medium,
        ])
            .subscribe(function (result) {
            _this.hideHeroImage = result.matches;
        });
    };
    ProductListComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], ProductListComponent.prototype, "paginator");
    ProductListComponent = __decorate([
        core_1.Component({
            selector: 'app-product-list',
            templateUrl: './product-list.component.html',
            styleUrls: ['./product-list.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], ProductListComponent);
    return ProductListComponent;
}());
exports.ProductListComponent = ProductListComponent;
