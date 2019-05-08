import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const defaultValue = 'N/A'

export default class DetailRow extends React.Component {
  _hasLink() {
    return this.props.onPress
  }

  _getValue() {
    switch (true) {
      case Boolean(this.props.children):
        return this.props.children

      case Boolean(this.props.icon):
        return (
          <MaterialIcons
            name={this.props.icon}
            size={26}
            color={this.props.actionColor}
          />
        )

      case Boolean(this.props.value):
        return (
          <Text
            style={[{ color: this._hasLink() ? this.props.actionColor : this.props.color }]}
            numberOfLines={1}
          >
            {this.props.value || defaultValue}
          </Text>
        )

      default:
        return <Text style={{ color: this.props.color }}>{defaultValue}</Text>
    }
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} disabled={!this._hasLink()} onPress={this.props.onPress}>
        <Text
          style={[
            styles.title,
            { color: this._hasLink() ? this.props.actionColor : this.props.labelColor },
          ]}
          numberOfLines={1}
        >
          {this.props.title}
        </Text>
        <View style={styles.valueContainer}>
          {this._getValue()}
        </View>
      </TouchableOpacity>
    )
  }
}

DetailRow.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
  icon: PropTypes.string,
  onPress: PropTypes.func,
  color: PropTypes.string,
  labelColor: PropTypes.string,
  actionColor: PropTypes.string,
}

DetailRow.defaultProps = {
  color: '#000',
  labelColor: '#a1a1a1',
  actionColor: '#0068ff',
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  valueContainer: {
    maxWidth: '60%',
    marginLeft: 'auto',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  value: {
    fontSize: 16,
  }
})
