import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ActivityIndicator,
  Image,
} from 'react-native';
import {theme} from '../utils/theme';

const transparent = 'transparent';
const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
  },
  background: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  container: {
    backgroundColor: transparent,
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textContainer: {
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textContent: {
    fontWeight: 'bold',
    height: 50,
    top: 55,
    color: theme.colors.yellow,
  },
});

const ANIMATION = ['none', 'slide', 'fade'];
const SIZES = ['small', 'normal', 'large'];

export default class Spinner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      textContent: this.props.textContent,
    };
  }

  static propTypes = {
    cancelable: PropTypes.bool,
    color: PropTypes.string,
    animation: PropTypes.oneOf(ANIMATION),
    overlayColor: PropTypes.string,
    size: PropTypes.oneOf(SIZES),
    textContent: PropTypes.string,
    textStyle: PropTypes.object,
    visible: PropTypes.bool,
    indicatorStyle: PropTypes.object,
    customIndicator: PropTypes.element,
    children: PropTypes.element,
    spinnerKey: PropTypes.string,
  };

  static defaultProps = {
    visible: false,
    cancelable: false,
    textContent: '',
    animation: 'none',
    color: 'white',
    size: 'large', // 'normal',
    overlayColor: 'rgba(0, 0, 0, 0.25)',
  };

  close() {
    this.setState({visible: false});
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    if (state.visible !== props.visible) newState.visible = props.visible;
    if (state.textContent !== props.textContent)
      newState.textContent = props.textContent;
    return newState;
  }

  _handleOnRequestClose() {
    if (this.props.cancelable) {
      this.close();
    }
  }
  //   <ActivityIndicator
  //   color={this.props.color}
  //   size={this.props.size}
  //   style={[styles.activityIndicator, {...this.props.indicatorStyle}]}
  // />
  _renderDefaultContent() {
    return (
      <View style={styles.background}>
        {this.props.customIndicator ? (
          this.props.customIndicator
        ) : (
          <Image
            style={{
              width: 70,
              height: 70,
              resizeMode: 'contain',
              borderRadius: 150,
            }}
            source={require('../assets/gif/loading.gif')}
          />
        )}
        <View style={[styles.textContainer, {...this.props.indicatorStyle}]}>
          <Text style={[styles.textContent, this.props.textStyle]}>
            {this.state.textContent}
          </Text>
        </View>
      </View>
    );
  }

  _renderSpinner() {
    const spinner = (
      <View
        style={[styles.container, {backgroundColor: '#00000099'}]}
        key={
          this.props.spinnerKey
            ? this.props.spinnerKey
            : `spinner_${Date.now()}`
        }>
        {this.props.children
          ? this.props.children
          : this._renderDefaultContent()}
      </View>
    );

    return (
      <Modal
        animationType={this.props.animation}
        onRequestClose={() => this._handleOnRequestClose()}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={this.state.visible}
        statusBarTranslucent={true}>
        {spinner}
      </Modal>
    );
  }

  render() {
    return this._renderSpinner();
  }
}
