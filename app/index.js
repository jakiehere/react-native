import {
  Stack,
  useRouter,
} from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';

import ScreenHeaderBtn from '../components/common/header/ScreenHeaderBtn';
import Nearbyjobs from '../components/home/nearby/Nearbyjobs';
import Popularjobs from '../components/home/popular/Popularjobs';
import Welcome from '../components/home/welcome/Welcome';
import {
  COLORS,
  icons,
  SIZES,
} from '../constants';

const Home = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={{flex: 1,  backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen 
                options={{ 
                    headerStyle:{ backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dismension="60%" />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={icons.profile} dismension="60%" />
                    ),
                    headerTitle: ""
                }}    
            />   
            <ScrollView showsVerticalScrollIndicator={false}>
                <View 
                    style={{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                >
                    <Welcome />
                    <Popularjobs />
                    <Nearbyjobs />
                </View>
            </ScrollView>      
        </SafeAreaView>
    )
}

export default Home