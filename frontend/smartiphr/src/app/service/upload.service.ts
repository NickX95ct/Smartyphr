import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Fatture } from "../models/fatture";
import { Paziente } from '../models/paziente';
import { map } from "rxjs/operators";
import { Dipendenti } from "../models/dipendenti";

@Injectable({
  providedIn: "root",
})
export class UploadService {
  api: string = environment.api;

  constructor(private http: HttpClient) {}

  async uploadDocument(body: FormData) {
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };


    let type = body.get('type');
    console.log('uploadDocument type: ' + type);

    if( type == 'richiestaMedico' || type == 'certificatoMedico')
      return this.http.post(`${this.api}/api/upload`, body, options).toPromise();
      
    //const req = new HttpRequest('POST', url, formData, options);
    //return this.http.request(req);
    return this.http.post(`${this.api}/api/upload`, body, options).toPromise();
  }

  async getFiles(path: string) {
    return this.http.get(`${this.api}/api/files/${path}`).toPromise();
  }

  async download(filename: string, id: string, subPath: string) {
    console.log("Downloading");

    let path = `${subPath}/${filename}`;
    if (id != undefined) {
      path = `${id}/${subPath}/${filename}`;
    }

    if (filename[0] != "/") path = `/${path}`;


    let formData: FormData = new FormData();
    formData.append("fileName", path);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    let params = {
      params: {
      }
    }

    let options = {
      params: {
        fileName: encodeURIComponent(path)
      },
      reportProgress: true,
      responseType: 'arraybuffer' as 'json'
    }


    

    // return this.http.post(`${this.api}/api/download`, formData, options).toPromise();
    //return this.http.post<Blob>(`${this.api}/api/download`, formData,  { responseType: 'arraybuffer' });
    return this.http.get(`${this.api}/api/download`, options);
  }



  async downloadDocDipendente(filename: string, type: string, dipendente: Dipendenti) {
    // let params = new HttpParams();
    let path = `${dipendente._id}/${type}/${filename}`;
    if (filename[0] != "/") path = `/${path}`;

    // const options = {
    //   params: params,
    //   reportProgress: true,
    // };

    // const body = {
    //   fileName: path,
    // };

    let formData: FormData = new FormData();
    formData.append("fileName", path);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    let params = {
      params: {
      }
    }

    let options = {
      params: {
        fileName: encodeURIComponent(path)
      },
      reportProgress: true,
      responseType: 'arraybuffer' as 'json'
    }

    // return this.http.post(`${this.api}/api/download`, formData, options).toPromise();
    //return this.http.post<Blob>(`${this.api}/api/download`, formData,  { responseType: 'arraybuffer' });
    return this.http.get(`${this.api}/api/download`, options);
  }






  async downloadDocMedicinaLavoro(filename: string, type: string, dipendente: Dipendenti) {
    // let params = new HttpParams();
    let path = `${dipendente._id}/${type}/${filename}`;
    if (filename[0] != "/") path = `/${path}`;

    // const options = {
    //   params: params,
    //   reportProgress: true,
    // };

    // const body = {
    //   fileName: path,
    // };

    let formData: FormData = new FormData();
    formData.append("fileName", path);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    let params = {
      params: {
      }
    }

    let options = {
      params: {
        fileName: encodeURIComponent(path)
      },
      reportProgress: true,
      responseType: 'arraybuffer' as 'json'
    }

    // return this.http.post(`${this.api}/api/download`, formData, options).toPromise();
    //return this.http.post<Blob>(`${this.api}/api/download`, formData,  { responseType: 'arraybuffer' });
    return this.http.get(`${this.api}/api/download`, options);
  }
}
