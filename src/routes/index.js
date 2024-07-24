import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'
import React from "react";
/** Analytics 페이지 */
import AnalyticsMain from "./pages/analytics/AnalyticsMain";



const Stack = createStackNavigator();

const Router = () => {
    return (
        // <NavigationContainer>
        //     <Stack.Navigator initialRouteName="AnalyticsMain">
        //         <Stack.Group screenOptions={{
        //             headerShown : false,
        //         }}>
        //             <Stack.Screen name="AnalyticsMain" component={AnalyticsMain} />
        //         </Stack.Group>
        //     </Stack.Navigator>
        // </NavigationContainer>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AnalyticsMain">
                <Stack.Group screenOptions={{
                    headerShown: false,
                }}>
                    <Stack.Screen
                        name="AnalyticsMain"
                        component={AnalyticsMain}
                    />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router;