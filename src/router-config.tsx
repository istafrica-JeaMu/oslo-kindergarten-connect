
// This file demonstrates where the manual application route should be added
// In your App.tsx, add this route to the caseworker routes:

// <Route path="/caseworker/manual-application" element={<ManualApplication />} />

// Import statement would be:
// import ManualApplication from '@/pages/caseworker/ManualApplication';

export const caseworkerRoutes = [
  {
    path: '/caseworker/manual-application',
    component: 'ManualApplication',
    description: 'Manual application form for guardians without e-ID'
  }
];
