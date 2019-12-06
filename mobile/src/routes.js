// import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import SignIn from './pages/SignIn';

import CheckIn from './pages/CheckIn';

import List from './pages/HelpOrder/List';
import Detail from './pages/HelpOrder/Detail';
import New from './pages/HelpOrder/New';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            CheckIn,
            HelpOrder: {
              screen: createSwitchNavigator({
                List,
                Detail,
                New,
              }),
            },
          },
          {
            tabBarOptions: {
              activeTintColor: '#EE4E62',
              inactiveTintColor: '#999999',
              labelStyle: {
                fontSize: 14,
                marginBottom: 15,
              },
              style: {
                backgroundColor: '#FFF',
              },
            },
          },
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      },
    ),
  );
