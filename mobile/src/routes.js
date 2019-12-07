import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';

import CheckIn from './pages/CheckIn';

import Listing from './pages/HelpOrder/Listing';
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
              screen: createStackNavigator(
                {
                  Listing,
                  Detail,
                  New,
                },
                {
                  defaultNavigationOptions: {
                    headerTintColor: '#FFF',
                    headerTransparent: true,
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                      top: 0,
                    },
                  },
                },
              ),
              navigationOptions: {
                // eslint-disable-next-line react/prop-types
                tabBarIcon: ({tintColor}) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#EE4E62',
              inactiveTintColor: '#999999',
              labelStyle: {
                fontSize: 14,
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
