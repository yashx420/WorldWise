import styles from './CityList.module.css'
import React from 'react';
import Spinner from './Spinner'
import CityItem from './CityItem';
import Message from './Message'
import { useCities } from '../contexts/CityContext';

export default function CityList() {
    const {cities, isLoading} = useCities();
    if(isLoading) return <Spinner />
    if(!cities.length) return <Message message="👋 Add a city you have been to" />
    return <ul className={styles.cityList}>
        {cities.map(city => <CityItem city={city} key={city.id} />)}
    </ul>
};
