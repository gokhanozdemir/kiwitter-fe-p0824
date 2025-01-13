import { useState } from 'react';

export function useLocalStorage(key = 'localData', initialValue) {
	// localStorage'dan veriyi almak için kullanılan fonksiyon
	const getLocalStorage = () => {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : initialValue;
	};

	// localStorage'a veri kaydetmek için kullanılan fonksiyon
	const setLocalStorage = (newValue) => {
		localStorage.setItem(key, JSON.stringify(newValue));
	};

	// useState hook'u kullanarak localStorage'dan alınan değeri saklayan ve güncelleyen state
	const [storedValue, setStoredValue] = useState(() => {
		// localStorage'a ilk açılışta bir kere bakarak alınan değeri hesaplayan fonksiyon
		const computedState = getLocalStorage();
		// localStorage'a hesaplanan değeri kaydeden fonksiyon
		setLocalStorage(computedState);
		return computedState;
	});

	// aynı anda state'i güncelleyen ve localStorage'a kaydeden fonksiyon
	const setStateAndLocalStorage = (newValue) => {
		setStoredValue(newValue);
		setLocalStorage(newValue);
	};

	return [storedValue, setStateAndLocalStorage];
}
