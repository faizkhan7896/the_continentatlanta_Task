import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import Button from '../../../components/Button';
import Statusbar from '../../../components/Statusbar';
import {theme} from '../../../utils/theme';
import TextFormatted from '../../../components/TextFormated';

export default function Privacy({navigation}) {
  const dimensions = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Statusbar
        barStyle="dark-content"
        backgroundColor={theme.colors.primary}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          backgroundColor: theme.colors.primary,
          paddingVertical: 13,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            style={{
              height: 30,
              width: 30,
              resizeMode: 'contain',
              marginRight: 20,
            }}
            source={require('../../../assets/Sidebar.png')}
          />
        </TouchableOpacity>
        <TextFormatted
          style={{
            color: theme.colors.Black,
            fontSize: 18,
            fontWeight: '700',
          }}>
          Privacy policy
        </TextFormatted>

        <Image
          style={{
            height: 40,
            width: 40,
            resizeMode: 'contain',
            borderRadius: 50,
            opacity: 0,
          }}
          source={{uri: 'https://picsum.photos/500'}}
        />
      </View>
      <ScrollView>
        <Image
          style={{
            height: dimensions.height / 3,
            width: dimensions.width,
            resizeMode: 'contain',
          }}
          source={require('../../../assets/Privacy_policy.png')}
        />
        <TextFormatted
          style={{
            color: theme.colors.Black,
            lineHeight: 20,
            letterSpacing: 1.5,
            paddingHorizontal: 20,
            marginVertical: 20,
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec risus,
          odio quis bibendum. Netus ac sem accumsan est. Sollicitudin vitae
          auctor aenean massa egestas purus ut amet ut. Porttitor mattis
          pulvinar dolor eu. Vestibulum dictumst risus non eu.{'\n'}Aliquam
          placerat ut enim accumsan et. Cursus dui varius nisi, ornare. Ut in
          eu, eu sit massa vel congue. Augue morbi ut cursus dolor cras. At ac
          sit velit interdum amet porttitor laoreet. Sit vulputate at at morbi
          quis neque laoreet. Habitant tempus diam massa ultrices consequat
          habitant dui, ultricies. Nunc vulputate orci nunc amet aliquet
          faucibus vulputate sapien. Et tellus rhoncus sollicitudin amet,
          phasellus senectus molestie egestas. Hendrerit nulla amet sit dictum
          commodo proin sit lacus scele.
        </TextFormatted>
      </ScrollView>
      <View style={{marginHorizontal: 20}}>
        <Button
          ButtonText={'I AGREE'}
          // paddingVertical={10}
          borderRadius={10}
          marginBottom={25}
        />
      </View>
    </View>
  );
}
