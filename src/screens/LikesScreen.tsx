import React from 'react';
import { View, Text, NativeBaseProvider, ScrollView, Center, HStack, Image } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';

const LikesScreen = () => {

    return (
        <NativeBaseProvider>
            <Image
                source={require('../../assets/logo.png')}
                alt='logo'
                mb={0}
                size={'xs'}
                mt={50}
                style={styles.logoImage}
            />
            <View style={styles.top_row_section}>
                <TouchableOpacity
                    style={styles.rowButton}
                >
                    <Text style={styles.rowText}>Ты нравишься</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.rowButton}
                >
                    <Text style={styles.rowText}>Твои лайки</Text>
                </TouchableOpacity>
            </View>

            <ScrollView>
                <HStack pt={10}>
                    <TouchableOpacity style={styles.likeCardItem}>
                        <Text fontSize="2xl">Text</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.likeCardItem}>
                        <Text fontSize="2xl">Text</Text>
                    </TouchableOpacity>
                </HStack>
            </ScrollView>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({

    rowButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 10,
    },
    rowText: {
        fontSize: 16,
    },
    top_row_section: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
    },

    likeCardItem: {
        borderRadius: 10,
        width: '45%',
        height: 220,
        margin: 10,
        backgroundColor: 'green'
    },

    logoImage: {

    }
})

export default LikesScreen;
