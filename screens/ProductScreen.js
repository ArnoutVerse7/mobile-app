// Importeer React en benodigde hooks/componenten
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import ProductCard from '../components/ProductCard';

// Definieer de categorieën voor filtering
const CATEGORIES = [
    { label: 'Home Shirt', key: 'home shirt' },
    { label: 'Away Shirt', key: 'away shirt' },
    { label: 'Retro Shirt', key: 'retro' },
];

// Hoofdcomponent voor het productoverzicht
export default function ProductScreen({ navigation }) {
    // State voor producten, filtering, zoeken, sorteren, laden
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [sort, setSort] = useState('default');
    const [loading, setLoading] = useState(true);

    // Haal producten op uit de API bij laden van het scherm
    useEffect(() => {
        fetch(
            'https://api.webflow.com/v2/sites/67abaae39a449d1e22641632/products',
            {
                headers: {
                    Authorization:
                        'Bearer 6c24c294fbecdcd14e5e2e3ca88426e33c74de20ffef2f561946cdb6f22b8398',
                },
            }
        )
            .then((res) => res.json())
            .then(({ items }) => {
                // Formatteer de producten voor gebruik in de app
                const formatted = items.map((it) => {
                    const p = it.product.fieldData;
                    const sku = it.skus[0].fieldData;

                    return {
                        id: it.product.id,
                        name: p.name,
                        description: p.description,
                        price: (sku.price.value / 100).toFixed(2),
                        image: { uri: sku['main-image'].url },
                    };
                });
                setProducts(formatted);
                setFiltered(formatted);
            })
            .finally(() => setLoading(false));
    }, []);

    // Filter, zoek en sorteer producten telkens als een filter verandert
    useEffect(() => {
        let list = [...products];

        // Zoekfunctie
        if (search.trim()) {
            const term = search.toLowerCase();
            list = list.filter((p) => p.name.toLowerCase().includes(term));
        }

        // Filter op categorie
        if (category !== 'all') {
            list = list.filter((p) =>
                p.name.toLowerCase().includes(category.toLowerCase())
            );
        }

        // Sorteer op prijs
        if (sort === 'priceLow') {
            list.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sort === 'priceHigh') {
            list.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }

        setFiltered(list);
    }, [search, category, sort, products]);

    // Toon een loader als producten nog laden
    if (loading)
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Our Shirts</Text>

            {/* Zoekbalk */}
            <TextInput
                placeholder="Search..."
                value={search}
                onChangeText={setSearch}
                style={styles.search}
            />

            {/* Filterknoppen */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginVertical: 10 }}
            >
                <TouchableOpacity
                    key="all"
                    onPress={() => setCategory('all')}
                    style={[
                        styles.filterBtn,
                        category === 'all' && styles.filterBtnActive,
                    ]}
                >
                    <Text style={{ color: category === 'all' ? '#fff' : '#333' }}>
                        ALL
                    </Text>
                </TouchableOpacity>

                {CATEGORIES.map(({ label, key }) => (
                    <TouchableOpacity
                        key={key}
                        onPress={() => setCategory(key)}
                        style={[
                            styles.filterBtn,
                            category === key && styles.filterBtnActive,
                        ]}
                    >
                        <Text style={{ color: category === key ? '#fff' : '#333' }}>
                            {label.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Sorteeropties */}
            <View style={styles.sortRow}>
                <Text>Sort:</Text>
                <TouchableOpacity onPress={() => setSort('priceLow')}>
                    <Text style={styles.sortOption}>Price ↑</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSort('priceHigh')}>
                    <Text style={styles.sortOption}>Price ↓</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSort('default')}>
                    <Text style={styles.sortOption}>Reset</Text>
                </TouchableOpacity>
            </View>

            {/* Toon de gefilterde producten */}
            {filtered.map((p) => (
                <ProductCard
                    key={p.id}
                    image={p.image}
                    name={p.name}
                    description={p.description}
                    price={p.price}
                    onPress={() =>
                        navigation.navigate('ProductDetails', { product: p })
                    }
                />
            ))}
        </ScrollView>
    );
}

// Styling voor het scherm
const styles = StyleSheet.create({
    container: { padding: 20 },
    header: { fontSize: 26, fontWeight: 'bold', marginVertical: 15 },
    search: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    filterBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    filterBtnActive: { backgroundColor: '#ff6a00' },
    sortRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        flexWrap: 'wrap',
    },
    sortOption: {
        marginLeft: 12,
        fontWeight: '500',
        color: '#ff6a00',
    },
});