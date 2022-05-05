import {Component, OnInit, ViewChild} from '@angular/core';
import {CreateHomestayComponent} from "../../dialog/create-homestay/create-homestay.component";
import {MatDialog} from "@angular/material/dialog";
import {Homestay2Service} from "../../service/homestay/homestay2.service";
import {MyHomestayDto} from "../../models/my-homestay-dto";
import {YourBillDto} from "../../models/your-bill-dto";
import {EditHomestayComponent} from "../../dialog/edit-homestay/edit-homestay.component";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {BillService} from "../../service/bill/bill.service";
import {TurnOver} from "../../models/turn-over";
import {ConfirmBookComponent} from "../../dialog/confirm-book/confirm-book.component";
import {ImagesHomestayComponent} from "../../dialog/images-homestay/images-homestay.component";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-my-homestay',
  templateUrl: './my-homestay.component.html',
  styleUrls: ['./my-homestay.component.css']
})
export class MyHomestayComponent implements OnInit {

  // displayedColumns: string[] = ['name', 'countPrice', 'sumPrice'];
  // dataSource!: MatTableDataSource<any>;
  //
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  //
  // formTurnOver: FormGroup = new FormGroup({});
  //
  // idAcc = localStorage.getItem('ACCOUNT_ID')
  // homestays!: MyHomestayDto[];
  // yourBill!: YourBillDto[];
  // input: any;
  // startDate1!: string;
  // startDate2!: string;
  // turnOver!: TurnOver[];
  // totalTurnOver = 0;

  constructor(private dialog: MatDialog,
              private homestayService: Homestay2Service,
              private billService: BillService,
              private toast: NgToastService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllMyHomestayRate()
    this.formTurnOver = this.fb.group({
      startDate1: [''],
      startDate2: [''],
    })
  }

  // findTurnOverByAccountAndStartDate() {
  //   if (this.startDate1 == null) {
  //     this.startDate1 = "2000-01-01"
  //   } else {
  //     this.startDate1 = this.formTurnOver.value.startDate1
  //   }
  //   if (this.startDate2 == null) {
  //     this.startDate2 = "2050-01-01"
  //   } else {
  //     this.startDate2 = this.formTurnOver.value.startDate2
  //   }
  //   this.billService.findTurnOverByAccountAndStartDate(this.idAcc,this.startDate1, this.startDate2).subscribe((data) => {
  //     this.turnOver = data;
  //     this.totalTurnOver = 0;
  //     this.dataSource = new MatTableDataSource<any>(data);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     for (let i = 0; i < this.turnOver.length; i++) {
  //       this.totalTurnOver += this.turnOver[i].sumPrice;
  //     }
  //   }, error => {
  //     this.toast.error({detail: "Thành công!", summary: "Không có kết quả tìm kiếm tương ứng!", duration: 5000})
  //     this.totalTurnOver = 0;
  //     this.dataSource = new MatTableDataSource<any>([])
  //   })
  // }

  getAllMyHomestayRate() {
    this.homestayService.getAllMyHomestayRate(this.idAcc).subscribe((data) => {
      this.homestays = data;
    })
  }

  getBillByAccountId() {
    this.homestayService.getYourBillByAccountId(this.idAcc).subscribe((data) => {
      this.yourBill = data;
    })
  }

  openCreateHome() {
    this.dialog.closeAll();
    this.dialog.open(CreateHomestayComponent, {
      width: '50%',
    }).afterClosed().subscribe(() => {
      this.getAllMyHomestayRate()
    });
  }

  openMyHomestay() {
    this.getAllMyHomestayRate()
    // @ts-ignore
    document.getElementById("my-homestay").style.display = 'block';
    // @ts-ignore
    document.getElementById("my-bill").style.display = 'none';
    // @ts-ignore
    document.getElementById("my-turn-over").style.display = 'none';
  }

  openMyBill() {
    this.getBillByAccountId()
    // @ts-ignore
    document.getElementById("my-homestay").style.display = 'none';
    // @ts-ignore
    document.getElementById("my-bill").style.display = 'block';
    // @ts-ignore
    document.getElementById("my-turn-over").style.display = 'none';
  }

  openTurnOver() {
    this.findTurnOverByAccountAndStartDate();
    // @ts-ignore
    document.getElementById("my-homestay").style.display = 'none';
    // @ts-ignore
    document.getElementById("my-bill").style.display = 'none';
    // @ts-ignore
    document.getElementById("my-turn-over").style.display = 'block';
  }

  openEditStatus(idHomestayDetail: any) {
    this.dialog.closeAll();
    this.dialog.open(EditHomestayComponent, {
      width: '50%',
      data: idHomestayDetail
    });
  }

  openImageHomestay(id: any) {
    this.dialog.closeAll();
    this.dialog.open(ImagesHomestayComponent, {
      width: '50%',
      data: id
    }).afterClosed().subscribe(() => {
      this.getAllMyHomestayRate();
    });
  }

  openConfirmHost(myBill:YourBillDto) {
    this.dialog.open(ConfirmBookComponent, {
      width: '50%',
      data :  myBill
    }).afterClosed().subscribe(() => {
      this.getBillByAccountId()
    });
    // @ts-ignore
    document.getElementById("confirm-host").hidden = false;
  }

  openCancellingInvoiceHost(myBill:YourBillDto) {
    this.dialog.open(ConfirmBookComponent, {
      width: '50%',
      data :  myBill
    }).afterClosed().subscribe(() => {
      this.getBillByAccountId()
    });
    // @ts-ignore
    document.getElementById("cancelling-invoice-host").hidden = false;
  }

  onCheckToday(date :any){

    let today = new Date();

    let date_today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return new Date(date) < date_today;
  }
}
