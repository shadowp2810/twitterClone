import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import {useEffect, useState} from 'react';
import { API, Auth, graphqlOperation } from 'aws-amplify';


import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
//import TabThreeScreen from '../screens/TabThreeScreen';
//import TabFourScreen from '../screens/TabFourScreen';
import { BottomTabParamList, HomeNavigatorParamList, SearchNavigatorParamList, NotificationsNavigatorParamList, MessagesNavigatorParamList } from '../types';
import ProfilePicture from '../components/ProfilePicture';
import { getUser } from '../src/graphql/queries';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ 
        activeTintColor: Colors[colorScheme].tint,
        showLabel: false,
         }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-home" color={Colors.light.tint} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-search" color={color} />,
        }}
      />
        <BottomTab.Screen
        name="Notifications"
        component={NotificationsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-notifications-outline" color={color} />,
        }}
      />
        <BottomTab.Screen
        name="Messages"
        component={MessagesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-mail" color={color} />,
        }}
      />

    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<HomeNavigatorParamList>();

function HomeNavigator() {

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    //get the current user
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
      if (!userInfo) {
        return;
      }
      try {
        const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub }))
        if(userData) {
          setUser(userData.data.getUser);
        }
      } catch (e) {
        console.log(e);
      }

    }
    fetchUser();
  }, [])

  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ 
          headerTitleAlign: 'center',
          headerStyle: {height: 80},
          headerRightContainerStyle: {
            marginRight: 15
          },
          headerLeftContainerStyle: {
            marginLeft: 10
          },
          headerTitle: () => (
            <Ionicons name={"logo-twitter"} size={30} color={Colors.light.tint}/>
          ),
          headerRight: () => (
            <MaterialCommunityIcons name={"star-four-points-outline"} size={30} color={Colors.light.tint} />
          ),
          headerLeft: () => (
            <ProfilePicture size={35} image={user?.image} />
          )
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<SearchNavigatorParamList>();

function SearchNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="SearchScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Search' }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<NotificationsNavigatorParamList>();

function NotificationsNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="NotificationsScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Notifications' }}
      />
    </TabThreeStack.Navigator>
  );
}

const TabFourStack = createStackNavigator<MessagesNavigatorParamList>();

function MessagesNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="MessagesScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Messages' }}
      />
    </TabFourStack.Navigator>
  );
}
