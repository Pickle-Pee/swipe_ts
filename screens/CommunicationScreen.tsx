import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Chat = {
  id: number;
  title: string;
};

const CommunicationScreen: React.FC = () => {
  const navigation = useNavigation();

  const chats: Chat[] = [
    { id: 1, title: 'Чат 1' },
    { id: 2, title: 'Чат 2' },
    { id: 3, title: 'Чат 3' },
  ];

  const renderItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('Chat', { chatId: item.id, title: item.title })}
    >
      <Text style={styles.chatTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={chats}
          style={styles.chatsContainer}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  chatItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  chatTitle: {
    fontSize: 16,
  },
  chatsContainer: {
    flex: 1,
  },
});

export default CommunicationScreen;
