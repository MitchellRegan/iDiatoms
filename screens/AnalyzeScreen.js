import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, Image, Dimensions } from 'react-native';
//import * as ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

//Styles
import Colors from '../styles/Colors';
import Fonts from '../styles/Fonts';
//Libraries
import ErrorAlertLibrary from '../functions/ErrorAlertLibrary';
import AnalyzeImageAPI from '../apiCalls/AnalyzeImageAPI';
//Components
import Header from '../components/shared/Header';

//The width of the screen
const SCREENWIDTH = Dimensions.get("window").width;

export default class AnalyzeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            diatomImage: null,
        }
    }


    /**
     * Method called from TouchableOpacity to check if the user granted this app to use images
     * */
    GetPermissionsAsync = async function () {
        const response = await MediaLibrary.requestPermissionsAsync();

        if (response.status !== "granted") {
            Alert.alert('Sorry, but we need camera permissions in order to access images.');
        }
        else {
            this.PickImage();
        }
    }


    /**
     * Method called from GetPermissionsAsync to let users pick an image from their device
     * */
    PickImage = async function () {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                base64: true,
                aspect: [1,1],
                quality: 1,
                allowsEditing: true
            });

            if (!result.cancelled) {
                //Setting the diatomImage in this.state
                this.setState(prevState => {
                    return ({
                        ...prevState,
                        diatomImage: result.uri
                    });
                });
            }
        }
        catch (error) {
            ErrorAlertLibrary.DisplayError("AnalyzeScreen.PickImage ERROR", error);
        }
    }


    /**
     * Method called from TouchableOpacity to clear the selected image
     * */
    ClearImage = function () {
        this.setState(prevState => {
            return ({
                ...prevState,
                diatomImage: null
            });
        });
    }


    /**
     * Function called from TouchableOpacity to analyze the diatomImage in this.state
     * @param {boolean} cancel_ If false, the image isn't analyzed and the prompt is closed
     * */
    SendToServer = function (cancel_ = false) {
        if (cancel_) {
            this.props.navigation.goBack();
            return;
        }

        AnalyzeImageAPI.apiCall(this.state.diatomImage)
            .then(() => {
                console.log("API call sent");
            })
            .catch(error => {
                ErrorAlertLibrary.DisplayError("AnalyzeScreen.SendToServer ERROR", error);
            })
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <Header
                    navigation={this.props.navigation}
                    showBackButton={true}
                />

                <Text style={styles.titleText}>Analyze Image</Text>

                <ScrollView style={styles.scrollView}>
                    <View style={styles.imageView}>
                        {(this.state.diatomImage != null) && <Image source={{ uri: this.state.diatomImage }} style={styles.image} />}

                        {(this.state.diatomImage == null) && <TouchableOpacity style={styles.imageUploadButton} onPress={() => this.GetPermissionsAsync(true)}>
                            <Text style={styles.imageUploadText}>Click To Select Image</Text>
                        </TouchableOpacity>}

                        {(this.state.diatomImage != null) && <View style={styles.changeRowView}>
                            <TouchableOpacity style={styles.imageChangeButton} onPress={() => this.GetPermissionsAsync(true)}>
                                <Text style={styles.imageChangeText}>Change Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.imageChangeButton} onPress={() => this.ClearImage(true)}>
                                <Text style={styles.imageChangeText}>Remove Image</Text>
                            </TouchableOpacity>
                        </View>}
                    </View>
                </ScrollView>

                <View style={styles.promptButtonView}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => this.SendToServer(true)}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>

                    <View style={styles.bar} />

                    <TouchableOpacity
                        style={styles.createButton}
                        onPress={() => this.SendToServer(false)}
                        disabled={(this.state.diatomImage == null)}
                    >
                        {(this.state.diatomImage != null) && <Text style={styles.createText}>Analyze</Text>}
                        {(this.state.diatomImage == null) && <Text style={styles.disabledCreateText}>Analyze</Text>}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.defaultScreenBackground
    },

    titleText: {
        fontFamily: Fonts.monospace,
        fontSize: 26,
        color: Colors.blackText,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 20
    },

    subtitleText: {
        fontFamily: Fonts.serif,
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center',
    },

    scrollView: {
        flex: 1
    },

    inputTitleText: {
        fontFamily: Fonts.serif,
        fontWeight: 'bold',
        fontSize: 16,
    },

    imageView: {
        alignSelf: 'center',
        marginTop: 15,
    },

    imageViewTextLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    image: {
        width: SCREENWIDTH - 15,
        height: SCREENWIDTH - 15,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.blackText,
        alignSelf: 'center',
    },

    imageUploadButton: {
        width: SCREENWIDTH - 15,
        height: SCREENWIDTH - 15,
        backgroundColor: Colors.whiteText,
        borderRadius: 5,
        borderColor: Colors.disabledText,
        borderWidth: 2,
        borderStyle: 'dashed',
        alignSelf: 'center',
        justifyContent: 'center',
    },

    imageUploadText: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: Colors.disabledText,
        fontSize: 34,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 6,
        paddingBottom: 6,
    },

    changeRowView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },

    imageChangeButton: {
        backgroundColor: Colors.whiteText,
        borderRadius: 5,
        borderColor: Colors.blackText,
        borderWidth: 2,
    },

    imageChangeText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: Colors.blackText,
        fontSize: 16,
        fontFamily: Fonts.monospace,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 6,
        paddingBottom: 6,
    },

    promptButtonView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
        borderTopWidth: 1,
        borderColor: '#000',
    },

    cancelButton: {
        justifyContent: 'center',
    },

    cancelText: {
        fontFamily: Fonts.serif,
        fontWeight: 'bold',
        fontSize: 18,
        padding: 15,
    },

    bar: {
        borderLeftWidth: 1,
        borderColor: '#000',
        height: '100%',
    },

    createButton: {
        justifyContent: 'center',
    },

    createText: {
        fontFamily: Fonts.serif,
        fontWeight: 'bold',
        fontSize: 18,
        padding: 15,
    },

    disabledCreateText: {
        fontFamily: Fonts.serif,
        fontWeight: 'bold',
        fontSize: 18,
        padding: 15,
        color: Colors.disabledText
    }
})