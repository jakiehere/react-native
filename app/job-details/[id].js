import React, {
  useCallback,
  useState,
} from 'react';

import {
  Stack,
  useRouter,
  useSearchParams,
} from 'expo-router';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';

import ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn';
import About from '../../components/jobdetails/about/About';
import Company from '../../components/jobdetails/company/Company';
import Footer from '../../components/jobdetails/footer/Footer';
import Specifics from '../../components/jobdetails/specifics/Specifics';
import JobTabs from '../../components/jobdetails/tabs/Tabs';
import {
  COLORS,
  icons,
  SIZES,
} from '../../constants';
import useFetch from '../../hooks/useFetch';

const tabs = ["About", "Qualification", "Responsibilities"];

const JobDetails = () => {
    const param = useSearchParams();
    const router = useRouter();
    const {data, isLoading, error, refetch} = useFetch('job-details', {
        job_id: param.id
    })
    const [refreshing, setRefreshing] = useState(false);
    const [activeTap, setActiveTap] = useState(tabs[0])
    const onRefresh = useCallback(() => {
        setRefreshing(true)
        refetch()
        setRefreshing(false)
    }, [])
    const displayTapContent = () => {
        switch(activeTap) {
            case "Qualification":
                return <Specifics 
                    title="Qualification"
                    points={data[0].job_highlights?.Qualifications ?? ['N/A']}
                />
            case "About":
                return <About 
                    info={data[0].job_description ?? "No data provided"}
                />
            case "Responsibilities":
                return <Specifics 
                title="Responsibilities"
                points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
            />
            default:
                break;
        }
    }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen
            options={{
                headerStyle: {
                    backgroundColor: COLORS.lightWhite
                },
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.left}
                        dimension="60%"
                        handlePress={() => router.back()}
                    />
                ),
                headerRight: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.share}
                        dimension="60%"
                    />
                ),
                headerTitle: ""
            }}
        />
        <>
            <ScrollView 
                showsHorizontalScrollIndicator={false} 
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : data.lenght === 0 ? (
                    <Text>No Data</Text>
                ) : data[0] ? (
                    <View style={{ padding: SIZES.medium, paddingBottom: 100}}>
                        <Company 
                            companyLogo={data[0].employer_logo}
                            jobTitle={data[0].job_title}
                            companyName={data[0].employer_name}
                            location={data[0].job_country}
                        />
                        <JobTabs
                            tabs={tabs}
                            activeTap={activeTap}
                            setActiveTap={setActiveTap}
                        />
                        {displayTapContent()}
                    </View>
                ) : null}
            </ScrollView>
            <Footer 
                url={data[0]?.job_apply_link ?? 'https://careers.google.com/jobs/results/'}
            />
        </>
    </SafeAreaView>
  )
}

export default JobDetails