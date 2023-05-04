import React from 'react';

import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SIZES } from '../../../constants';
import styles from './tabs.style';

const TabButton = ({name, activeTap, onHandleSearchType}) => (
  <TouchableOpacity
    style={styles.btn(name, activeTap)}
    onPress={onHandleSearchType}
  >
    <Text style={styles.btnText(name, activeTap)}>{name}</Text>
  </TouchableOpacity>
)
const JobTabs = ({tabs, activeTap, setActiveTap}) => {

  return (
    <View style={styles.container}>
      <FlatList 
        data={tabs}
        renderItem={({item}) => (
          <TabButton 
            name={item}
            activeTap={activeTap}
            onHandleSearchType={() => setActiveTap(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        contentContainerStyle={{ columnGap: SIZES.small / 2}}
      />
    </View>
  )
}

export default JobTabs