import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
    ToastAndroid,
    Modal
} from 'react-native';

export default class Domain extends Component {
    static defaultProps = {
        DomainApi: 'https://www.sojson.com/api/beian/'
        // https://www.sojson.com/api/beian/xj8c.cc
    };
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.rowData.title,
        headerTitleStyle: { alignSelf: 'center', width: 200, marginRight: 32 },
    });
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            isShowResult: false,
            inputText: '',
            nature: '',
            icp: '',
            indexUrl: '',
            sitename: '',
            domain: '',
            nowIcp: '',
            type: 0,
            search: '',
            checkDate: '',
            name: '',
        };
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderQueryBox()}
                {this.renderQueryResult()}
            </View>
        );
    }
    renderQueryBox() {
        return (
            <View style={styles.txtInputView}>
                <TextInput
                    style={styles.input}
                    returnKeyType="search"
                    underlineColorAndroid='transparent'
                    placeholder="请输入要查询的域名"
                    placeholderTextColor="#8A8A8A"
                    autoCorrect={false}
                    numberofLines={1}
                    onChangeText={(text) => this.setState({ inputText: text })}
                    onEndEditing={() => { this.searchDomain() }}
                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        this.searchDomain()
                    }}
                >
                    <View style={styles.btn}>
                        <Text style={styles.search}>查 询</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    renderQueryResult() {
        const result = this.state.result;
        const now = new Date();
        if (this.state.isShowResult && result.type == 200) {
            return (
                <View style={styles.resultView}>
                    <Text style={styles.resultText}>查询域名：{result.search}</Text>
                    <Text style={styles.resultText}>一级域名：{result.domain}</Text>
                    <Text style={styles.resultText}>域名首页：{result.indexUrl}</Text>
                    <Text style={styles.resultText}>所属名称：{result.name}</Text>
                    <Text style={styles.resultText}>备案性质：{result.nature}</Text>
                    <Text style={styles.resultText}>备案名称：{result.sitename}</Text>
                    <Text style={styles.resultText}>主备案号：{result.icp}</Text>
                    <Text style={styles.resultText}>当前备案号：{result.nowIcp}</Text>
                    <Text style={styles.resultText}>查询时间：{result.checkDate == "" ? now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() : result.checkDate}</Text>
                </View>
            );
        } else if (result.type == 300) {
            return (
                <View style={styles.resultView}>
                    <Text style={styles.resultText}>查询域名：{result.search}</Text>
                    <Text style={styles.resultText}>{result.message}</Text>
                    <Text style={styles.resultText}>请检查您输入的域名是否正确！</Text>
                </View>
            );
        }
    }
    searchDomain() {
        const domain = this.state.inputText;
        if (domain == "") {
            ToastAndroid.show('请输入您要查询的域名', ToastAndroid.SHORT)
            return false
        } else if (domain.length < 4) {
            ToastAndroid.show('请检查您的域名是否正确', ToastAndroid.SHORT)
            return false
        } else if (domain == ("xj8c.cc") || domain == ("meowv.com")) {
            ToastAndroid.show('这么牛逼的域名不允许查询', ToastAndroid.SHORT)
            return false
        }
        const API = this.props.DomainApi + domain;
        fetch(API)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    result: responseData,
                    isShowResult: true,
                })
            })
            .catch((error) => {
                ToastAndroid.show('网络异常...', ToastAndroid.SHORT)
            })
    }
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    icon_share: {
        width: 30,
        height: 30,
        marginRight: 20
    },
    txtInputView: {
        flexDirection: 'row',
        height: 50,
        margin: 20,
    },
    input: {
        width: width - 100,
        height: 50,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: '#393A3E',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        fontSize: 16,
        color: '#393A3E'
    },
    btn: {
        width: 60,
        marginLeft: -5,
        marginRight: 5,
        backgroundColor: '#393A3E',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    search: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultView: {
        margin: 20,
        paddingTop: 20,
    },
    resultText: {
        color: '#393A3E',
        fontSize: 18,
        marginBottom: 10,
        borderBottomWidth: 1,
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