import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Campaign } from '@app/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CampaignService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<Campaign[]> {
        return this.http.get<Campaign[]>(`${environment.apiUrl}/api/campaign/all`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/api/campaign/${id}`);
    }

    create(campaign: Campaign) {
        return this.http.post(`${environment.apiUrl}/api/campaign/create`, campaign);
    }

    search(campaign: Campaign): Observable<Campaign[]>{
        return this.http.post<Campaign[]>(`${environment.apiUrl}/api/campaign/search`, campaign);
    }
}