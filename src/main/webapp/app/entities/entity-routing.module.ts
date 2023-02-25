import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'master-lookup',
        data: { pageTitle: 'shrmsApp.masterLookup.home.title' },
        loadChildren: () => import('./master-lookup/master-lookup.module').then(m => m.MasterLookupModule),
      },
      {
        path: 'form-validator',
        data: { pageTitle: 'shrmsApp.formValidator.home.title' },
        loadChildren: () => import('./form-validator/form-validator.module').then(m => m.FormValidatorModule),
      },
      {
        path: 'employee',
        data: { pageTitle: 'shrmsApp.employee.home.title' },
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
      },
      {
        path: 'reporting',
        data: { pageTitle: 'shrmsApp.reporting.home.title' },
        loadChildren: () => import('./reporting/reporting.module').then(m => m.ReportingModule),
      },
      {
        path: 'personal-details',
        data: { pageTitle: 'shrmsApp.personalDetails.home.title' },
        loadChildren: () => import('./personal-details/personal-details.module').then(m => m.PersonalDetailsModule),
      },
      {
        path: 'personal-id',
        data: { pageTitle: 'shrmsApp.personalId.home.title' },
        loadChildren: () => import('./personal-id/personal-id.module').then(m => m.PersonalIdModule),
      },
      {
        path: 'family-info',
        data: { pageTitle: 'shrmsApp.familyInfo.home.title' },
        loadChildren: () => import('./family-info/family-info.module').then(m => m.FamilyInfoModule),
      },
      {
        path: 'address',
        data: { pageTitle: 'shrmsApp.address.home.title' },
        loadChildren: () => import('./address/address.module').then(m => m.AddressModule),
      },
      {
        path: 'contacts',
        data: { pageTitle: 'shrmsApp.contacts.home.title' },
        loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule),
      },
      {
        path: 'banks-details',
        data: { pageTitle: 'shrmsApp.banksDetails.home.title' },
        loadChildren: () => import('./banks-details/banks-details.module').then(m => m.BanksDetailsModule),
      },
      {
        path: 'education',
        data: { pageTitle: 'shrmsApp.education.home.title' },
        loadChildren: () => import('./education/education.module').then(m => m.EducationModule),
      },
      {
        path: 'work-experience',
        data: { pageTitle: 'shrmsApp.workExperience.home.title' },
        loadChildren: () => import('./work-experience/work-experience.module').then(m => m.WorkExperienceModule),
      },
      {
        path: 'remuneration',
        data: { pageTitle: 'shrmsApp.remuneration.home.title' },
        loadChildren: () => import('./remuneration/remuneration.module').then(m => m.RemunerationModule),
      },
      {
        path: 'pf-details',
        data: { pageTitle: 'shrmsApp.pfDetails.home.title' },
        loadChildren: () => import('./pf-details/pf-details.module').then(m => m.PfDetailsModule),
      },
      {
        path: 'esi-details',
        data: { pageTitle: 'shrmsApp.esiDetails.home.title' },
        loadChildren: () => import('./esi-details/esi-details.module').then(m => m.EsiDetailsModule),
      },
      {
        path: 'leave-application',
        data: { pageTitle: 'shrmsApp.leaveApplication.home.title' },
        loadChildren: () => import('./leave-application/leave-application.module').then(m => m.LeaveApplicationModule),
      },
      {
        path: 'company',
        data: { pageTitle: 'shrmsApp.company.home.title' },
        loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
      },
      {
        path: 'region',
        data: { pageTitle: 'shrmsApp.region.home.title' },
        loadChildren: () => import('./region/region.module').then(m => m.RegionModule),
      },
      {
        path: 'branch',
        data: { pageTitle: 'shrmsApp.branch.home.title' },
        loadChildren: () => import('./branch/branch.module').then(m => m.BranchModule),
      },
      {
        path: 'state',
        data: { pageTitle: 'shrmsApp.state.home.title' },
        loadChildren: () => import('./state/state.module').then(m => m.StateModule),
      },
      {
        path: 'salary-settings',
        data: { pageTitle: 'shrmsApp.salarySettings.home.title' },
        loadChildren: () => import('./salary-settings/salary-settings.module').then(m => m.SalarySettingsModule),
      },
      {
        path: 'tds',
        data: { pageTitle: 'shrmsApp.tds.home.title' },
        loadChildren: () => import('./tds/tds.module').then(m => m.TdsModule),
      },
      {
        path: 'department',
        data: { pageTitle: 'shrmsApp.department.home.title' },
        loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule),
      },
      {
        path: 'designation',
        data: { pageTitle: 'shrmsApp.designation.home.title' },
        loadChildren: () => import('./designation/designation.module').then(m => m.DesignationModule),
      },
      {
        path: 'leave-type',
        data: { pageTitle: 'shrmsApp.leaveType.home.title' },
        loadChildren: () => import('./leave-type/leave-type.module').then(m => m.LeaveTypeModule),
      },
      {
        path: 'leave-policy',
        data: { pageTitle: 'shrmsApp.leavePolicy.home.title' },
        loadChildren: () => import('./leave-policy/leave-policy.module').then(m => m.LeavePolicyModule),
      },
      {
        path: 'custom-leave-policy',
        data: { pageTitle: 'shrmsApp.customLeavePolicy.home.title' },
        loadChildren: () => import('./custom-leave-policy/custom-leave-policy.module').then(m => m.CustomLeavePolicyModule),
      },
      {
        path: 'holiday',
        data: { pageTitle: 'shrmsApp.holiday.home.title' },
        loadChildren: () => import('./holiday/holiday.module').then(m => m.HolidayModule),
      },
      {
        path: 'work-days-setting',
        data: { pageTitle: 'shrmsApp.workDaysSetting.home.title' },
        loadChildren: () => import('./work-days-setting/work-days-setting.module').then(m => m.WorkDaysSettingModule),
      },
      {
        path: 'approval-setting',
        data: { pageTitle: 'shrmsApp.approvalSetting.home.title' },
        loadChildren: () => import('./approval-setting/approval-setting.module').then(m => m.ApprovalSettingModule),
      },
      {
        path: 'approval-level',
        data: { pageTitle: 'shrmsApp.approvalLevel.home.title' },
        loadChildren: () => import('./approval-level/approval-level.module').then(m => m.ApprovalLevelModule),
      },
      {
        path: 'custom-approvar',
        data: { pageTitle: 'shrmsApp.customApprovar.home.title' },
        loadChildren: () => import('./custom-approvar/custom-approvar.module').then(m => m.CustomApprovarModule),
      },
      {
        path: 'employment-type',
        data: { pageTitle: 'shrmsApp.employmentType.home.title' },
        loadChildren: () => import('./employment-type/employment-type.module').then(m => m.EmploymentTypeModule),
      },
      {
        path: 'working-hours',
        data: { pageTitle: 'shrmsApp.workingHours.home.title' },
        loadChildren: () => import('./working-hours/working-hours.module').then(m => m.WorkingHoursModule),
      },
      {
        path: 'employee-leave-account',
        data: { pageTitle: 'shrmsApp.employeeLeaveAccount.home.title' },
        loadChildren: () => import('./employee-leave-account/employee-leave-account.module').then(m => m.EmployeeLeaveAccountModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
