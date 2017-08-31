import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    WebView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    Dimensions,
    ToastAndroid,
    Modal
} from 'react-native';
import * as WeChat from 'react-native-wechat';

export default class Detail extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.rowData.title,
        headerTitleStyle: { width: width / 0.8 },
        headerRight: (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={navigation.state.params.navigatePress}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={styles.icon_share} source={{ uri: 'icon_share' }} />
                </View>
            </TouchableOpacity>
        ),
    });
    constructor(props) {
        super(props);
        WeChat.registerApp('wx2e64aec2c4ec904e');
        this.state = {
            isShareModal: false
        };
    }
    navigatePress = () => { this.setState({ isShareModal: true }); }
    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="fade"
                    visible={this.state.isShareModal}
                    transparent
                    onRequestClose={() => {
                        this.setState({ isShareModal: false });
                    }}
                >
                    {this.renderShare()}
                </Modal>
                <WebView
                    automaticallyAdjustContentInsets={true}
                    source={{ html: this.props.navigation.state.params.rowData.content }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                >
                </WebView>
            </View>
        );
    }
    renderShare() {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.setState({
                        isShareModal: false
                    });
                }}
            >
                <View key={'spinner'} style={styles.spinner}>
                    <View style={styles.spinnerContent}>
                        <Text style={[styles.spinnerTitle, { fontSize: 20, color: 'black' }]}>
                            分享到
                        </Text>
                        <View style={styles.shareParent}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    this.dealWithWXShare(0)
                                }}
                            >
                                <View style={styles.shareContent}>
                                    <Image style={styles.shareIcon} source={{ uri: 'share_icon_wechat' }} />
                                    <Text style={styles.spinnerTitle}>微信</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    this.dealWithWXShare(1)
                                }}
                            >
                                <View style={styles.shareContent}>
                                    <Image style={styles.shareIcon} source={{ uri: 'share_icon_moments' }} />
                                    <Text style={styles.spinnerTitle}>朋友圈</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
    dealWithWXShare(type) {
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    if (type == 0) {
                        WeChat.shareToSession({
                            title: this.props.navigation.state.params.rowData.title,
                            description: '分享自:当然我在瞎扯(xj8c.cc)\n生命不息，奋斗不止-阿星Plus',
                            thumbImage: 'http://lorempixel.com/160/110',
                            type: 'news',
                            webpageUrl: 'https://meowv.github.io/' + this.props.navigation.state.params.rowData.path + '?from=app'
                        })
                            .then((result) => {
                                ToastAndroid.show('分享成功', ToastAndroid.SHORT)
                            })
                            .catch((error) => {
                                if (error.message == -2)
                                    ToastAndroid.show('取消分享', ToastAndroid.SHORT)
                                else
                                    ToastAndroid.show('分享出错', ToastAndroid.SHORT)
                            });
                        this.setState({ isShareModal: false });
                    } else if (type == 1) {
                        WeChat.shareToTimeline({
                            title: this.props.navigation.state.params.rowData.title,
                            description: '分享自:当然我在瞎扯(xj8c.cc)\n生命不息，奋斗不止-阿星Plus',
                            thumbImage: 'http://lorempixel.com/160/110',
                            type: 'news',
                            webpageUrl: 'https://meowv.github.io/' + this.props.navigation.state.params.rowData.path + '?from=app'
                        })
                            .then((result) => {
                                ToastAndroid.show('分享成功', ToastAndroid.SHORT)
                            })
                            .catch((error) => {
                                if (error.message == -2)
                                    ToastAndroid.show('取消分享', ToastAndroid.SHORT)
                                else
                                    ToastAndroid.show('分享出错', ToastAndroid.SHORT)
                            });
                        this.setState({ isShareModal: false });
                    }
                } else {
                    ToastAndroid.show('未安装微信,请您安装微信后再试', ToastAndroid.SHORT)
                }
            });
    }
    componentDidMount() {
        this.props.navigation.setParams({
            navigatePress: this.navigatePress
        })
    }
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    icon_share: {
        width: 20,
        height: 20,
        marginRight: 15
    },
    spinner: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.65)'
    },
    spinnerContent: {
        justifyContent: 'center',
        width: width * (7 / 10),
        height: width * (7 / 10) * 0.68,
        backgroundColor: '#fcfcfc',
        padding: 20,
        borderRadius: 5
    },
    spinnerTitle: {
        fontSize: 18,
        color: '#313131',
        textAlign: 'center',
        marginTop: 5
    },
    shareParent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    shareContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    shareIcon: {
        width: 40,
        height: 40,
    }
});