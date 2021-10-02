import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

//Styles
import Colors from '../styles/Colors';
import Fonts from '../styles/Fonts';
//Components
import Header from '../components/shared/Header';

export default class AboutScreen extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <Header
                    navigation={this.props.navigation}
                    showBackButton={true}
                />

                <Text style={styles.headerText}>About iDiatoms</Text>

                <Text style={styles.bodyText}>The iDiatoms project is part of a research project belonging to the Emporia State University's Biology department. Its goal is to allow researchers of diatoms a way to quickly and accurately recognize and categorize images of different types of diatoms using machine learning.</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.defaultScreenBackground
    },

    headerText: {
        fontFamily: Fonts.monospace,
        fontSize: 26,
        color: Colors.blackText,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 20
    },

    bodyText: {
        fontFamily: Fonts.notoserif,
        fontSize: 14,
        color: Colors.blackText,
        margin: 20,
        marginTop: 10,
    },
})