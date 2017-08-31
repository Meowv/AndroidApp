import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import GamesData from '../json/games.json';

export default class Tool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }).cloneWithRows(GamesData)
        };
        this.renderRow = this.renderRow.bind(this);
    }
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
    renderRow(rowData) {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.props.navigation.navigate(rowData.router, { rowData })}
            >
                <View style={styles.wrapView}>
                    <Image style={styles.logo} source={{ uri: rowData.logo }} />
                    <View style={styles.txtView}>
                        <Text numberOfLines={1} style={styles.title}>{rowData.title}</Text>
                        <Text numberOfLines={1} style={styles.describe}>{rowData.describe}</Text>
                        <Text numberOfLines={1} style={styles.updateTime}>更新时间：{rowData.updateTime}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    wrapView: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    txtView: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 10
    },
    logo: {
        width: 80, height: 80
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        width: width - 80
    },
    describe: {
        fontSize: 16,
        width: width - 80
    },
    updateTime: {
        fontSize: 14,
        width: width - 80
    }
});