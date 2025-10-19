'use client';

import { Wave } from 'react-animated-text';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';

import css from './RatesPage.module.css';
import Filter from '@/components/Filter/Filter';

export default function RatesPage() {
  const isError = false;

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
          <Filter />
          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}
        </Container>
      </Section>
    </main>
  );
}
