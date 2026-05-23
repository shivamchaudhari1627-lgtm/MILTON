import { useState, useEffect } from 'react';

interface CurrencyData {
  currencyCode: string;
  rate: number;
  symbol: string;
}

export function useCurrency() {
  const [currencyData, setCurrencyData] = useState<CurrencyData>({
    currencyCode: 'USD',
    rate: 1,
    symbol: '$'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocationAndCurrency() {
      try {
        // Fetch user location based on IP
        const ipRes = await fetch('https://ipapi.co/json/');
        if (!ipRes.ok) throw new Error('Failed to fetch location');
        const ipData = await ipRes.json();
        
        const userCurrency = ipData.currency || 'USD';

        // Fetch exchange rates
        const rateRes = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!rateRes.ok) throw new Error('Failed to fetch rates');
        const rateData = await rateRes.json();

        const rate = rateData.rates[userCurrency] || 1;

        // Try to get the currency symbol format using Intl.NumberFormat
        let symbol = '$';
        try {
          const parts = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: userCurrency,
          }).formatToParts(1);
          const symbolPart = parts.find(p => p.type === 'currency');
          if (symbolPart) symbol = symbolPart.value;
        } catch (e) {
          // Fallback to code if symbol cannot be determined
          symbol = userCurrency + ' ';
        }

        setCurrencyData({
          currencyCode: userCurrency,
          rate: rate,
          symbol: symbol
        });
      } catch (error) {
        console.error('Error fetching currency data:', error);
        // Default to USD on error
      } finally {
        setLoading(false);
      }
    }

    fetchLocationAndCurrency();
  }, []);

  const formatPrice = (usdPrice: number) => {
    const converted = usdPrice * currencyData.rate;
    return new Intl.NumberFormat(navigator.language || 'en-US', {
      style: 'currency',
      currency: currencyData.currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(converted);
  };

  return { ...currencyData, formatPrice, loading };
}
