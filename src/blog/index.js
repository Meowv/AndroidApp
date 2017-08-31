import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    BackHandler,
    ToastAndroid,
    TouchableOpacity,
    WebView,
    ListView,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { PullList } from 'react-native-pull';

const firstClick = 0;
const width = Dimensions.get('window').width;
const hide = { position: 'absolute', left: -10000 };
const show = { position: 'relative', left: 0 };

export default class Blog extends Component {
    static defaultProps = {
        BlogApi: 'https://meowv.github.io/content.json'
    };
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
            isLoading: true
        };
        this.renderRow = this.renderRow.bind(this);
        this.getTags = this.getTags.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
        this.onPullRelease = this.onPullRelease.bind(this);
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#393A3E' />
                {this.renderLoading()}
                <PullList
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    onPullRelease={this.onPullRelease}
                    topIndicatorRender={this.topIndicatorRender}
                    topIndicatorHeight={50}
                    onEndReachedThreshold={50}
                    initialListSize={1}
                />
            </View>
        );
    }
    renderLoading() {
        if (this.state.isLoading) {
            return (
                <View style={{ marginTop: width / 2, paddingBottom: 5 }}>
                    <ActivityIndicator size="small" color="#393A3E" />
                    <Text style={{ width: width, textAlign: 'center' }}>拼命加载中...</Text>
                </View>
            )
        }
    }
    renderRow(rowData) {
        const color = 'rgb(' + Math.floor(Math.random() * 255) + ','
            + Math.floor(Math.random() * 255) + ','
            + Math.floor(Math.random() * 255) + ')';
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.props.navigation.navigate('Detail', { rowData })}
            >
                <View style={styles.wrapView}>
                    <View style={styles.logo}>
                        <WebView
                            automaticallyAdjustContentInsets={true}
                            source={{ uri: 'http://lorempixel.com/160/110/?r=' + Math.random() }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            startInLoadingState={true}
                        >
                        </WebView>
                    </View>
                    <View style={styles.txtView}>
                        <Text style={styles.title}>{rowData.title}</Text>
                        <Text numberOfLines={1} style={[styles.tags, { color: color }]}>
                            {this.getTags(rowData)}
                        </Text>
                        <Text numberOfLines={1} style={styles.updateTime}>更新时间：{rowData.date.substring(0, 10)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    onPullRelease(resolve) {
        this.fetchData();
        setTimeout(() => {
            resolve();
        }, 1000);
    }
    topIndicatorRender(pulling, pullok, pullrelease) {
        setTimeout(() => {
            if (pulling) {
                this.txtPulling && this.txtPulling.setNativeProps({ style: show });
                this.txtPullok && this.txtPullok.setNativeProps({ style: hide });
                this.txtPullrelease && this.txtPullrelease.setNativeProps({ style: hide });
            } else if (pullok) {
                this.txtPulling && this.txtPulling.setNativeProps({ style: hide });
                this.txtPullok && this.txtPullok.setNativeProps({ style: show });
                this.txtPullrelease && this.txtPullrelease.setNativeProps({ style: hide });
            } else if (pullrelease) {
                this.txtPulling && this.txtPulling.setNativeProps({ style: hide });
                this.txtPullok && this.txtPullok.setNativeProps({ style: hide });
                this.txtPullrelease && this.txtPullrelease.setNativeProps({ style: show });
            }
        }, 1);
        return (
            <View style={styles.pullView}>
                <ActivityIndicator size="small" color="#393A3E" />
                <Text ref={(c) => { this.txtPulling = c; }}>&nbsp;下拉刷新...</Text>
                <Text ref={(c) => { this.txtPullok = c; }}>&nbsp;松手刷新...</Text>
                <Text ref={(c) => { this.txtPullrelease = c; }}>&nbsp;正在刷新...</Text>
            </View>
        );
    }
    fetchData() {
        fetch(this.props.BlogApi)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData),
                    isLoading: false
                });
            })
            .catch((error) => {
                ToastAndroid.show('网络异常...', ToastAndroid.SHORT);
            })
    }
    getTags(rowData) {
        var tags = '';
        if (rowData.tags.length != 0) {
            for (var i = 0; i < rowData.tags.length; i++) {
                var tagsItems = rowData.tags[i].name;
                tags += tagsItems + ' ';
            }
        } else {
            tags = rowData.title
        }
        return tags;
    }
    componentDidMount() {
        this.fetchData();
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000);
        BackHandler.addEventListener('hardwareBackPress', this.handleBack)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack)
    }
    handleBack = () => {
        var timestamp = (new Date()).valueOf();
        if (timestamp - firstClick > 2000) {
            firstClick = timestamp;
            ToastAndroid.show('再按一次退出', ToastAndroid.SHORT);
            return true;
        } else {
            return false;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    pullView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    wrapView: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        paddingBottom: 5
    },
    txtView: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 10
    },
    logo: {
        width: 160, height: 110
    },
    title: {
        fontSize: 18,
        color: '#393A3E',
        fontWeight: 'bold',
        width: width - 180
    },
    tags: {
        fontSize: 16,
        width: width - 180
    },
    updateTime: {
        fontSize: 14,
        color: '#8A8A8A',
        width: width - 180
    }
});