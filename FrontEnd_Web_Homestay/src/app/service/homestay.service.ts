import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Homestay2} from "../models/homestay2";
import {Observable} from "rxjs";
import {ImageOfHomestay} from "../models/image-of-homestay";
import {environment} from "../../environments/environment";

import {Homestay2Service} from "./homestay/homestay2.service";
import {HomestayType} from "../models/homestay-type";
import {City} from "../models/city";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class HomestayService {


}
