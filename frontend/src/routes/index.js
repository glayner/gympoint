import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Sign from '~/pages/Sign';

import Enrollment from '~/pages/Enrollment';
import ManageEnrollment from '~/pages/Enrollment/ManageEnrollment';
import RegisterEnrollment from '~/pages/Enrollment/RegisterEnrollment';

import Plan from '~/pages/Plan';
import ManagePlan from '~/pages/Plan/ManagePlan';
import RegisterPlan from '~/pages/Plan/RegisterPlan';

import Student from '~/pages/Student';
import ManageStudent from '~/pages/Student/ManageStudent';
import RegisterStudent from '~/pages/Student/RegisterStudent';

import Suport from '~/pages/Suport';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Sign} />

      <Route path="/enrollment" component={Enrollment} isPrivate />
      <Route
        path="/enrollmentmanage/:id"
        component={ManageEnrollment}
        isPrivate
      />
      <Route
        path="/enrollmentregister"
        component={RegisterEnrollment}
        isPrivate
      />

      <Route path="/plan" component={Plan} isPrivate />
      <Route path="/planmanage/:id" component={ManagePlan} isPrivate />
      <Route path="/planregister" component={RegisterPlan} isPrivate />

      <Route path="/student" component={Student} isPrivate />
      <Route path="/studentmanage/:name" component={ManageStudent} isPrivate />
      <Route path="/studentregister" component={RegisterStudent} isPrivate />

      <Route path="/suport" component={Suport} isPrivate />
    </Switch>
  );
}
