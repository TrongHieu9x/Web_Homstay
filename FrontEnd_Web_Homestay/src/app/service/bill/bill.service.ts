import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Bill} from "../../models/bill";
import {Observable} from "rxjs";
import {TurnOver} from "../../models/turn-over";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class BillService {



}
