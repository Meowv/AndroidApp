/**
 * 
 */

import React, { Component } from 'react';
import { Image } from 'react-native';
import { TabNavigator } from "react-navigation";
import Blog from './blog/index';
import Tool from './tool/index';
import Game from './game/index';

/**
 * 博客、工具、游戏
 */
const Main = TabNavigator(
    {
        // 博客
        Blog: {
            screen: Blog,
            navigationOptions: {
                headerTitle: '当然我在瞎扯',
                headerTintColor: '#FFF',
                headerStyle: { elevation: 0, backgroundColor: '#393A3E' },
                tabBarLabel: '当然我在瞎扯',
                tabBarIcon: ({ tintColor, focused }) => (
                    focused
                        ?
                        <Image source={{ uri: 'icon_blog_active' }} style={{ width: 25, height: 25 }} />
                        :
                        <Image source={{ uri: 'icon_blog' }} style={{ width: 25, height: 25 }} />
                )
            }
        },
        // 工具
        Tool: {
            screen: Tool,
            navigationOptions: {
                headerTitle: '工具',
                headerTintColor: '#FFF',
                headerStyle: { elevation: 0, backgroundColor: '#393A3E' },
                tabBarLabel: '工具',
                tabBarIcon: ({ tintColor, focused }) => (
                    focused
                        ?
                        <Image source={{ uri: 'icon_tool_active' }} style={{ width: 25, height: 25 }} />
                        :
                        <Image source={{ uri: 'icon_tool' }} style={{ width: 25, height: 25 }} />
                )
            }
        },
        // 游戏
        Game: {
            screen: Game,
            navigationOptions: {
                headerTitle: '游戏',
                headerTintColor: '#FFF',
                headerStyle: { elevation: 0, backgroundColor: '#393A3E' },
                tabBarLabel: '游戏',
                tabBarIcon: ({ tintColor, focused }) => (
                    focused
                        ?
                        <Image source={{ uri: 'icon_game_active' }} style={{ width: 25, height: 25 }} />
                        :
                        <Image source={{ uri: 'icon_game' }} style={{ width: 25, height: 25 }} />
                )
            }
        }
    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: false,
        backBehavior: 'none',
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#1AAD19',
            inactiveTintColor: '#8A8A8A',
            showIcon: true,
            indicatorStyle: { height: 0 },
            style: {
                backgroundColor: '#F6F6F6',
                height: 60
            },
            labelStyle: {
                marginTop: 5,
                fontSize: 12,
            }
        }
    }
);

module.exports = Main;