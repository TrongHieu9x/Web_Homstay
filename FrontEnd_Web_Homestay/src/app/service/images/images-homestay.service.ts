import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ImageOfHomestay} from "../../models/image-of-homestay";
import {Observable} from "rxjs";
import {Homestay2} from "../../models/homestay2";
import {environment} from "../../../environments/environment";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ImagesHomestayService {

}
