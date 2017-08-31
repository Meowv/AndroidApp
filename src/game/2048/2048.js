import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    WebView
} from 'react-native';

export default class _2048 extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.rowData.title,
        headerTitleStyle: { alignSelf: 'center', width: 150 },
    });
    render() {
        return (
            <View style={styles.container}>
                <WebView
                    automaticallyAdjustContentInsets={true}
                    source={{ uri: 'https://meowv.github.io/Game/2/' }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                >
                </WebView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    }
});