import React, { useState, useEffect } from "react";
import { Select, View } from "native-base";
import { StyleSheet } from "react-native";

const BirthdayPicker: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [day, setDay] = useState<string[]>([]);

    const daysInMonth = new Date(Number(selectedYear), Number(selectedMonth) + 1, 0).getDate();

    const days = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ]
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => (currentYear - 1).toString());

    const updateSelectedDay = (newValue: string) => {
        const newDay = Math.min(Number(newValue), daysInMonth);
        setSelectedDay(newDay.toString());
    }

    useEffect(() => {
        const daysInMonth = new Date(Number(selectedYear), Number(selectedMonth) + 1, 0).getDate();
        const newDays = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

        setDay(newDays);

    }, [selectedYear, selectedMonth]);

    useEffect(() => {
        const newDaysInMonth = new Date(Number(selectedYear), Number(selectedMonth) + 1, 0).getDate();

        if (Number(selectedDay) > newDaysInMonth) {
            setSelectedDay('');
        }
    }, [selectedYear, selectedMonth, selectedDay])

    return (
        <View style={styles.container}>
            <Select
                minWidth="100"
                accessibilityLabel="Месяц"
                placeholder="Месяц"
                placeholderTextColor={'#000'}
                marginX={3}
                dropdownIcon={true}
                borderWidth={0.5}
                borderColor={'#000'}
                style={styles.selectItem}
                selectedValue={selectedMonth}
                onValueChange={(itemValue) => {
                    setSelectedMonth(itemValue);
                    updateSelectedDay(selectedDay);
                }} >
                {months.map((month, index) => (
                    <Select.Item
                        key={month}
                        label={month}
                        value={month} />
                ))}
            </Select>

            <Select
                minWidth="70"
                accessibilityLabel="День"
                placeholder="День"
                marginX={3}
                placeholderTextColor={'#000'}
                dropdownIcon={true}
                borderWidth={0.5}
                borderColor={'#000'}
                style={styles.selectItem}
                selectedValue={selectedDay}
                onValueChange={(itemValue) => updateSelectedDay(itemValue)} >
                {days.map((day) => (
                    <Select.Item
                        key={day}
                        label={day}
                        value={day} />
                ))}
            </Select>

            <Select
                minWidth="70"
                accessibilityLabel="Год"
                placeholder="Год"
                placeholderTextColor={'#000'}
                marginX={3}
                dropdownIcon={true}
                borderWidth={0.5}
                borderColor={'#000'}
                style={styles.selectItem}
                selectedValue={selectedYear}
                onValueChange={(itemValue) => setSelectedYear(itemValue)}>
                {years.map((year) => (
                    <Select.Item
                        key={year}
                        label={year}
                        value={year} />
                ))}
            </Select>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 50
    },

    selectItem: {
        margin: 5,
    }
})

export default BirthdayPicker;