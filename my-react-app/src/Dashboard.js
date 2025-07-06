import React, { useState, useEffect } from 'react';
import LineChartComponent from './LineChartComponent';
import BarChartComponent from './BarChartComponent';
import sneakerData from './sneakerData.json';
import translations from './i18n';
import Header from './Header';
import Footer from './footer';
import './App.css';

const modelImages = {
  'Nike Air Max 90': {
    Men: require('./Assets/nike_air_max_90_men.png'),
    Women: require('./Assets/nike_air_max_90_women.png'),
  },
  'Nike Dunk Low Panda': {
    Men: require('./Assets/nike_dunk_low_panda_male.png'),
    Women: require('./Assets/nike_dunk_low_panda_women.png'),
  },
  'Adidas UltraBoost 22': {
    Men: require('./Assets/adidas_ultra_boost_22_men.png'),
    Women: require('./Assets/adidas_ultra_boost_22_women.png'),
  },
  'Adidas Forum Low': {
    Men: require('./Assets/adidas_forum_low_men.png'),
    Women: require('./Assets/adidas_forum_low_women.png'),
  },
  'Yeezy Boost 350 v2': {
    Men: require('./Assets/yeezy_boost_350_v2_men.png'),
    Women: require('./Assets/yeezy_boost_350_v2_women.png'),
  },
  'Air Jordan 1 Retro High OG': {
    Men: require('./Assets/air_jordan_1_retro_high_og_men.png'),
    Women: require('./Assets/air_jordan_1_retro_high_og_women.png'),
  },
};

const currencyIcons = {
  CAD: '🇨🇦',
  USD: '🇺🇸',
  EUR: '🇪🇺',
};

const Dashboard = () => {
  const [selectedModel, setSelectedModel] = useState('Nike Air Max 90');
  const [selectedMonth, setSelectedMonth] = useState('2023-02');
  const [currency, setCurrency] = useState('CAD');
  const [gender, setGender] = useState('Men');
  const [chartData, setChartData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [language, setLanguage] = useState('en');

  const months = ['2023-01', '2023-02', '2023-03'];
  const currencies = ['CAD', 'USD', 'EUR'];

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  useEffect(() => {
    const sneaker = sneakerData.find(
      (s) => s.model === selectedModel && s.gender === gender
    );

    if (sneaker) {
      const formattedData = Object.entries(sneaker.prices).map(([month, prices]) => ({
        month,
        price: prices[currency],
      }));
      setChartData(formattedData);
    } else {
      setChartData([]);
    }
  }, [selectedModel, currency, gender]);

  useEffect(() => {
    const filtered = sneakerData
      .filter((s) => s.gender === gender)
      .map((s) => ({
        model: s.model,
        price: s.prices[selectedMonth]?.[currency] || 0,
      }));
    setComparisonData(filtered);
  }, [selectedMonth, currency, gender]);

  return (
    <>
      <Header language={language} toggleLanguage={toggleLanguage} />

      <div className="dashboard-container">
        <div className="control-section">
          <div className="image-controls">
            <div className="model-image">
              <img
                src={modelImages[selectedModel][gender]}
                alt={`${selectedModel} - ${gender}`}
                style={{
                  maxWidth: '150px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
              <div style={{ marginTop: '0.5rem', fontWeight: '600', textAlign: 'center' }}>
                {selectedModel} ({t.genderOptions[gender]})
              </div>
            </div>
            <div
              className="currency-icon"
              style={{
                fontSize: '3rem',
                lineHeight: 1,
                userSelect: 'none',
                fontWeight: '700',
                color: '#374151',
              }}
              title={t.currencyOptions[currency]}
            >
              {currencyIcons[currency]}
            </div>
          </div>
          <div className="dashboard-controls-group">
            <div className="dashboard-controls">
              <label htmlFor="model">{t.selectModel}</label>
              <select
                id="model"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                <option>Nike Air Max 90</option>
                <option>Nike Dunk Low Panda</option>
                <option>Adidas UltraBoost 22</option>
                <option>Adidas Forum Low</option>
                <option>Yeezy Boost 350 v2</option>
                <option>Air Jordan 1 Retro High OG</option>
              </select>
            </div>

            <div className="dashboard-controls">
              <label htmlFor="gender">{t.selectGender}</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Men">{t.genderOptions.Men}</option>
                <option value="Women">{t.genderOptions.Women}</option>
              </select>
            </div>

            <div className="dashboard-controls">
              <label htmlFor="currency">{t.selectCurrency}</label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {currencies.map((cur) => (
                  <option key={cur} value={cur}>
                    {t.currencyOptions[cur]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h2>{t.priceTrend}: {selectedModel}</h2>
          <p style={{ marginTop: '-0.5rem', color: '#ffffff', fontSize: '0.95rem' }}>
            {t.priceTrendDescription}
          </p>
          <LineChartComponent data={chartData} language={language} currency={currency} />
        </div>

        <div className="dashboard-controls" style={{ marginTop: '2rem' }}>
          <label htmlFor="month">{t.selectMonth}</label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="chart-card" style={{ marginTop: '2rem' }}>
          <h2>{t.modelComparison} – {selectedMonth}</h2>
          <p style={{ marginTop: '-0.5rem', color: '#ffffff', fontSize: '0.95rem' }}>
            {t.modelComparisonDescription}
          </p>
          <BarChartComponent data={comparisonData} language={language} currency={currency} />
        </div>

        <p style={{ marginTop: '2rem', textAlign: 'center', color: '#ffffff', fontSize: '0.9rem' }}>
          {t.dataSource}
        </p>
      </div>

      <Footer t={t} />

    </>
  );
};

export default Dashboard;