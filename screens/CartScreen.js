// Dit scherm toont het winkelmandje met alle toegevoegde producten en het totaalbedrag.
import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from '../components/CartContext';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
    const { cartItems, removeFromCart } = useContext(CartContext);

    // Bereken totaalprijs
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Cart</Text>
            {/* Lijst van producten in het winkelmandje */}
            <FlatList
                data={cartItems}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{item.name || item.title}</Text>
                            <Text style={styles.subtitle}>Quantity: {item.quantity}</Text>
                            <Text style={styles.price}>€ {(item.price * item.quantity).toFixed(2)}</Text>
                        </View>
                        {/* Verwijderknop */}
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => removeFromCart(item.id)}
                        >
                            <Ionicons name="trash" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.empty}>Cart is empty.</Text>}
            />
            {/* Totaalprijs */}
            {cartItems.length > 0 && (
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total:</Text>
                    <Text style={styles.totalPrice}>€ {total.toFixed(2)}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#faf8ff' },
    header: { fontSize: 26, fontWeight: 'bold', marginVertical: 15, marginBottom: 20 },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    subtitle: { fontSize: 14, color: '#666', marginVertical: 2 },
    price: { fontSize: 15, color: '#FF8800', fontWeight: 'bold' },
    removeButton: {
        backgroundColor: '#FF3B30',
        borderRadius: 20,
        padding: 8,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    empty: { textAlign: 'center', color: '#888', marginTop: 40 },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2,
    },
    totalText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#FF8800' },
});