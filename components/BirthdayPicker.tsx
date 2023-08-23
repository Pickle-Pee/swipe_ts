import React, { useState, useEffect } from "react";
import { Select, View } from "native-base";
import { StyleSheet } from "react-native";

const generateDaysArray = (year: any, month: any) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
}

const generateYearsArray = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());
}

const BirthdayPicker: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [days, setDays] = useState<string[]>(generateDaysArray(2000, 0));
    const [years, setYears] = useState<string[]>(generateYearsArray());

    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ]

    useEffect(() => {
        setDays(generateDaysArray(Number(selectedYear), Number(selectedMonth)));
    }, [selectedYear, selectedMonth]);

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
                    setSelectedDay('')
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
                onValueChange={(itemValue) => setSelectedDay(itemValue)} >
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