import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function Button({ onPress }) {

    return (
        <TouchableOpacity onPress={onPress} className={`flex align-middle items-center absolute top-2 left-2 flex-row px-2 py-1 gap-1`}>
            <Text className='text-black text-base font-medium'>Back</Text>
        </TouchableOpacity>
    );
};

export function PayGlocal({ onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Pay with Glocal</Text>
        </TouchableOpacity>
    );
}

export function PayStickyPaypal({ onPress }) {
    return (
        <TouchableOpacity style={[styles.button, styles.paypalButton]} onPress={onPress}>
            <Text style={[styles.buttonText, styles.paypalText]}>Pay with PayPal</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 278,
        height: 70,
        marginHorizontal: 'auto',
        paddingVertical: 5,
        marginBottom: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        backgroundColor: '#1B7A6A',
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    paypalButton: {
        backgroundColor: '#0070BA',
    },
    paypalText: {
        color: 'white',
    },
});