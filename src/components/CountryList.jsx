import styles from './CountryList.module.css';
import React from 'react';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';
import { useCities } from '../contexts/CityContext';

export default function CountryList() {
  const {cities, isLoading} = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="👋 Add a country you have been to" />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem key={country.country} country={country}/>
      ))}
    </ul>
  );
}
