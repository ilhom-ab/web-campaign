import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Campaign } from '@app/models';
import { CampaignService, AlertService } from '@app/services';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html'
})
export class CampaignComponent implements OnInit {
  campaignForm: FormGroup;
  radioSelected: string;

  campaigns: Campaign[];
  public selectedFile: any;
  imgURL: any;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private campaignSvc: CampaignService, private alert: AlertService) { }

  ngOnInit() {
    this.campaignForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      email: [null, [Validators.required]],
      content: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };

  }

  get f() { return this.campaignForm.controls; }

  cancel() {
    this.router.navigate(['/home']);
  }

  remove() {
    this.imgURL = null;
  }

  onSubmit() {
    if (this.campaignForm.invalid) {
      return;
    }

    const campaign = new Campaign();
    campaign.title = this.f.title.value;
    campaign.email = this.f.email.value;
    campaign.content = this.f.content.value;
    campaign.status = this.f.status.value;
    campaign.file = this.imgURL;

    this.campaignSvc.create(campaign).subscribe(data => {
      if (data) {
        this.alert.success(this.f.title.value + 'Created Successfuly');
        this.router.navigate(['/home']);
      }
    },
      error => {
        this.alert.error(error);
      })
  }
}
