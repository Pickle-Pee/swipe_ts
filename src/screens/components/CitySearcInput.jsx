import React, { useState, useEffect } from 'react';
import { TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const CitySearchInput = ({ onSelectCity }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            // Выполнение поиска при вводе символов
            axios.post(`http://193.164.150.223:1024/api/clean_address?address=${searchQuery}`)
                .then(response => {
                    console.log('Response data:', response.data); // Добавьте эту строку
                    setSearchResults(response.data);
                })
                .catch(error => {
                    console.error('Error searching cities:', error);
                });
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    return (
        <>
            <TextInput
                placeholder="Введите название города"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            {searchResults.length > 0 && (
                <FlatList
                    data={searchResults}
                    keyExtractor={item => item.fias_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => onSelectCity(item)}>
                            <Text>{item.result}</Text> {/* Используйте поле result для отображения */}
                        </TouchableOpacity>
                    )}
                />

            )}
        </>
    );
};

export default CitySearchInput;
