import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

//Styles
import Colors from '../styles/Colors';
import Fonts from '../styles/Fonts';
//Components
import Header from '../components/shared/Header';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <Header
                    navigation={this.props.navigation}
                    showBackButton={false}
                />

                <TouchableOpacity style={styles.tabButton} onPress={() => this.props.navigation.navigate("Analyze")}>
                    <Text style={styles.buttonText}>Analyze Image</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabButton} onPress={() => this.props.navigation.navigate("About")}>
                    <Text style={styles.buttonText}>About</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.defaultScreenBackground
    },

    buttonText: {
        fontFamily: Fonts.monospace,
        color: Colors.whiteText,
        fontSize: 22,
        padding: 15,
        alignSelf: 'center',
    },

    tabButton: {
        backgroundColor: Colors.primary,
        borderColor: Colors.blackText,
        borderWidth: 2,
        borderLeftWidth: 0,
        borderBottomEndRadius: 100,
        borderTopEndRadius: 100,
        shadowColor: Colors.blackText,
        shadowRadius: 20,
        shadowOffset: {width: 20, height: 20},
        marginTop: 30,
        marginRight: 20,
    },
});