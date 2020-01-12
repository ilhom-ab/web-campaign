import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, Campaign } from '@app/models';
import { Router } from '@angular/router';
import { AuthenticationService, CampaignService, AlertService } from '@app/services';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    currentUserSubscription: Subscription;
    searchForm: FormGroup;
    campaigns: Campaign[];
    public employeedata = [];
    p: Number = 1;
    count: Number = 8;

    constructor(
        private authenticationService: AuthenticationService, private campaignSvc: CampaignService,
        private router: Router, private formBuilder: FormBuilder, private alert: AlertService) {
        this.searchForm = this.formBuilder.group({
            title: null,
            email: null,
            status: null,
        });

        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    get f() { return this.searchForm.controls; }

    ngOnInit() {
        this.campaignSvc.getAll().subscribe(data => {
            if (data) {
                this.campaigns = data;
            }
        },
            error => {
                this.alert.error(error);
            });
    }

    add() {
        this.router.navigate(['/campaign']);
    }

    onSubmit() {
        if (this.searchForm.invalid) {
            return;
        }

        const camp = new Campaign();
        camp.title = this.f.title.value;
        camp.email = this.f.email.value;
        camp.status = this.f.status.value;

        this.campaignSvc.search(camp).subscribe(data => {
            if (data) {
                this.campaigns = data;
            }
        },
            error => {
                this.alert.error(error);
            });
    }
}