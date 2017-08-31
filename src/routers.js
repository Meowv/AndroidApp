import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import Main from './main';
import Detail from './blog/detial';
import Domain from './tool/domain/domain';
import _2048 from './game/2048/2048';

const TransitionConfiguration = () => ({
    screenInterpolator: (sceneProps) => {
        const { scene } = sceneProps;
        const { route } = scene;
        const params = route.params || {};
        const transition = params.transition || 'forHorizontal';
        return CardStackStyleInterpolator[transition](sceneProps);
    },
})
const Routers = StackNavigator(
    {
        Main: { screen: Main },
        Detail: { screen: Detail },
        _2048: { screen: _2048 },
        Domain: { screen: Domain },
    },
    {
        initialRouteName: 'Main',
        transitionConfig: TransitionConfiguration,
        navigationOptions: {
            headerTintColor: '#FFF',
            headerStyle: { elevation: 0, backgroundColor: '#393A3E' },
            headerTitleStyle: { alignSelf: 'center' },
            gesturesEnabled: true,
        },
    }
);

module.exports = Routers;