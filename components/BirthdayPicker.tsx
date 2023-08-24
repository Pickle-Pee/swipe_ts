import React, { useState, useEffect,useMemo } from "react";
import { Select, View } from "native-base";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";



const generateDaysArray = (year: number, month: number) : Array<string>  => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
}

const generateYearsArray = (): Array<string> => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());
}




const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

const BirthdayPicker: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<string>('1');
    console.log(selectedDay);
    
    const [selectedMonth, setSelectedMonth] = useState<string>(months[0]);
    const [selectedYear, setSelectedYear] = useState<string>('2000');

    const days = useMemo(() => generateDaysArray(Number(selectedYear), months.findIndex((el)=>el==selectedMonth)), [selectedYear, selectedMonth]);
    const years = useMemo(() => generateYearsArray(), []);

    const formatNumber = (number: string | number): string => {
        return number.toString().padStart(2, '0');
    };

    const getFormattedBirthday = (): string => {
        const formattedDay = formatNumber(selectedDay);
        const selectedMonthIndex = months.indexOf(selectedMonth) + 1;
        const formattedMonth = formatNumber(selectedMonthIndex);
        const formattedYear = selectedYear;
        
        return `${formattedYear}-${formattedMonth}-${formattedDay}`;
    };

    useEffect(() => {
       // setDays(generateDaysArray(Number(selectedYear), months.findIndex((el) => el == selectedMonth)));

        const formattedBirthday = getFormattedBirthday();
        onBirthdaySelected(formattedBirthday);

    }, [selectedYear, selectedMonth]);

    return (
        <View style={styles.container}>
            <Select
                minWidth="100"
                accessibilityLabel="Месяц"
                placeholder="Месяц"
                placeholderTextColor={'#000'}
                marginX={3}
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
                //accessibilityLabel="День"
                placeholder="День"
                marginX={3}
                placeholderTextColor={'#000'}
                borderWidth={0.5}
                
                borderColor={'#000'}
                variant="unstyled"
                
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