import React from 'react';
import {
    View,
    ViewPropTypes,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';
import PropTypes from 'prop-types';

const handleTabPress = (index, multiple, selectedIndex, onTabPress) => {
    if (multiple) {
        onTabPress(index);
    }
    else if (selectedIndex !== index) {
        onTabPress(index);
    }
};

const TabOption = ({
    isTabActive, index, badge, item,
    firstTabStyle, lastTabStyle,
    tabStyle, activeTabStyle,
    tabTextStyle, activeTabTextStyle,
    tabBadgeContainerStyle, activeTabBadgeContainerStyle,
    tabBadgeStyle, activeTabBadgeStyle,
    onTabPress,
}) => {

    return (
        <TouchableOpacity style={[
            styles.tabStyle,
            tabStyle,
            isTabActive ? [styles.activeTabStyle, activeTabStyle] : {},
            firstTabStyle,
            lastTabStyle]}
            onPress={() => onTabPress(index)}
            activeOpacity={1}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: 'center' }}>
                {item.icon && item.icon()}
                <Text style={[
                    styles.tabTextStyle,
                    tabTextStyle,
                    isTabActive ? [styles.activeTabTextStyle, activeTabTextStyle] : {}]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.title}
                </Text>
                {
                    badge ?
                        <View style={[
                            styles.tabBadgeContainerStyle,
                            tabBadgeContainerStyle,
                            isTabActive ? [styles.activeTabBadgeContainerStyle, activeTabBadgeContainerStyle] : {}]}>
                            <Text style={[
                                styles.tabBadgeStyle,
                                tabBadgeStyle,
                                isTabActive ? [styles.activeTabBadgeStyle, activeTabBadgeStyle] : {}]}>
                                {badge}
                            </Text>
                        </View> : false
                }
            </View>
        </TouchableOpacity>
    );
}

const SegmentedControlTab = ({
    multiple, selectedIndex, selectedIndices, values,
    badges, borderRadius, tabsContainerStyle,
    tabStyle, activeTabStyle,
    tabTextStyle, activeTabTextStyle,
    tabBadgeContainerStyle, activeTabBadgeContainerStyle,
    tabBadgeStyle, activeTabBadgeStyle,
    onTabPress,
}) => {

    const firstTabStyle = [{ borderRightWidth: values.length < 3 ? 1 : 0, borderTopLeftRadius: borderRadius, borderBottomLeftRadius: borderRadius }]
    const lastTabStyle = [{ borderLeftWidth: values.length == 1 ? 1 : 0, borderTopRightRadius: borderRadius, borderBottomRightRadius: borderRadius }]

    return (
        <View
            style={[styles.tabsContainerStyle, tabsContainerStyle]}
            removeClippedSubviews={false}>
            {
                values.map((item, index) => {
                    return (
                        <TabOption
                            key={index}
                            index={index}
                            badge={badges && badges[index] ? badges[index] : false}
                            isTabActive={multiple ? selectedIndices.includes(index) : selectedIndex === index}
                            item={item}
                            onTabPress={(index) => handleTabPress(index, multiple, selectedIndex, onTabPress)}
                            firstTabStyle={index === 0 ? [firstTabStyle] : {}}
                            lastTabStyle={index === values.length - 1 ? [lastTabStyle] : {}}
                            tabStyle={[tabStyle, index !== 0 && index !== values.length - 1 ? {} : {}]}
                            activeTabStyle={activeTabStyle}
                            tabTextStyle={tabTextStyle}
                            activeTabTextStyle={activeTabTextStyle}
                            tabBadgeContainerStyle={tabBadgeContainerStyle}
                            activeTabBadgeContainerStyle={activeTabBadgeContainerStyle}
                            tabBadgeStyle={tabBadgeStyle}
                            activeTabBadgeStyle={activeTabBadgeStyle} />
                    );
                })
            }
        </View>
    );
};

SegmentedControlTab.propTypes = {
    values: PropTypes.arrayOf(PropTypes.shape({title: PropTypes.string.isRequired, icon: PropTypes.func})),
    badges: PropTypes.array,
    multiple: PropTypes.bool,
    onTabPress: PropTypes.func,
    selectedIndex: PropTypes.number,
    selectedIndices: PropTypes.arrayOf(PropTypes.number),
    tabsContainerStyle: ViewPropTypes.style,
    tabStyle: ViewPropTypes.style,
    activeTabStyle: ViewPropTypes.style,
    tabTextStyle: Text.propTypes.style,
    activeTabTextStyle: Text.propTypes.style,
    tabBadgeContainerStyle: Text.propTypes.style,
    activeTabBadgeContainerStyle: Text.propTypes.style,
    tabBadgeStyle: Text.propTypes.style,
    activeTabBadgeStyle: Text.propTypes.style,
    borderRadius: PropTypes.number
}

SegmentedControlTab.defaultProps = {
    values: [{title: 'One'}, {title: 'Two'}, {title: 'Three'}],
    badges: ['', '', ''],
    multiple: false,
    selectedIndex: 0,
    selectedIndices: [0],
    onTabPress() { },
    tabsContainerStyle: {},
    tabStyle: {},
    activeTabStyle: {},
    tabTextStyle: {},
    activeTabTextStyle: {},
    tabBadgeContainerStyle: {},
    activeTabBadgeContainerStyle: {},
    tabBadgeStyle: {},
    activeTabBadgeStyle: {},
    borderRadius: 5
}

const styles = StyleSheet.create({
    tabsContainerStyle: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    tabStyle: {
        paddingLeft: 12,
        paddingRight: 12,
        flex: 1,
        alignItems: 'center',
        borderColor: '#0076FF',
        backgroundColor: 'white',
    },
    activeTabStyle: {
        backgroundColor: '#0076FF'
    },
    tabTextStyle: {
        color: '#0076FF'
    },
    activeTabTextStyle: {
        color: 'white'
    },
    tabBadgeContainerStyle: {
        borderRadius: 20,
        backgroundColor: 'red',
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 5,
        marginBottom: 3
    },
    activeTabBadgeContainerStyle: {
        backgroundColor: 'white'
    },
    tabBadgeStyle: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold'
    },
    activeTabBadgeStyle: {
        color: 'black'
    }
})

export default SegmentedControlTab
