import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import Navigator from 'react-native-deprecated-custom-components';
import MyScene from './MyScene';

export default class App extends Component {
    render() {
        return (
            <Navigator.Navigator
                initialRoute={{ name: '13', component: MyScene }}
                configureScene={(route) => {
                    return Navigator.Navigator.SceneConfigs.VerticalDownSwipeJump;
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator} />
                }} />
        )
    }
}

AppRegistry.registerComponent('App', () => App);