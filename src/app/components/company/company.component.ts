import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company.model';
import { Activity } from '../../models/activity.model';
import { CompanyService } from '../../services/company.service';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  currentPage = 1;
  pageSize = 50;
  companies: Company[] = [];
  displayedCompanies: Company[] = [];
  activities: Activity[] = [];
  activityFilters: Activity[] = [];
  hideContact: Map<number, boolean> = new Map<number, boolean>();
  isCompaniesListFull = false;

  constructor(private companyService: CompanyService, private activityService: ActivityService) { }

  ngOnInit(): void {
    this.getCompanies();
    this.getActivities();
  }

  getCompanies(): void {
    this.companyService.getAll(this.currentPage, this.pageSize).subscribe(data => {
      let newCompanies:Company[] = (data as any).content;
      this.companies = [...this.companies, ...newCompanies];
      newCompanies.forEach((company:Company) => this.hideContact.set(company.id, true));
      this.filterDisplayedCompanies();
      if (newCompanies.length < this.pageSize) {
        this.isCompaniesListFull = true;
      }
    });
  }

  getActivities(): void {
    this.activityService.getAll().subscribe(data => {
      this.activities = (data as any).content;
    });
  }

  filterDisplayedCompanies(): void {
    this.displayedCompanies = [];
    if (this.activityFilters.length === 0) {
      this.displayedCompanies = this.companies;
    } else {
      this.displayedCompanies = this.companies.filter(company => {
        return company.activities.some(activity =>
          this.activityFilters.map(a => a.id)
            .includes(activity.id));
      });
    }
  }

  toggleDetails(company: Company): void {
    this.hideContact.set(company.id, !this.hideContact.get(company.id));
  }

  onScrollDown() {
    if (!this.isCompaniesListFull) {
      this.currentPage++;
      this.getCompanies();
    }
  }

}
