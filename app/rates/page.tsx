'use client';

import { Wave } from 'react-animated-text';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';
import { latestRates } from '@/lib/service/exchangeAPI';

import css from './RatesPage.module.css';
import RatesList from '@/components/RatesList/RatesList';
import { useEffect, useState } from 'react';

export default function RatesPage() {
  const [rates, setRates] = useState<[string, number][]>([]);
  const [isError, setIsError] = useState(false);

  const baseCurrency = 'USD'; // <-------------------------  Взяти базову валюту зі стану Zustand і передати в запит

  useEffect(() => {
    latestRates(baseCurrency)
      .then((response) => {
        setRates(response); // замість useState додати масив в rates[] стан Zustand
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }, [baseCurrency, isError]);

  console.log(rates);

  const filteredRates = rates
    .filter(([key]) => key !== baseCurrency)
    .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }));
  console.log(filteredRates);

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info
            bottom
            title={
              <Wave
                text={`$ $ $ Current exchange rate for 1 ${'UAH'} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />
          {filteredRates.length > 0 && <RatesList rates={filteredRates} />}

          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}
        </Container>
      </Section>
    </main>
  );
}
