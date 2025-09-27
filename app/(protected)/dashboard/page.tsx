'use client'
import Guard from '@/components/guard'
import AppHeader from '@/components/app-header'
import ActionCardDaily from '@/components/action-card-daily'
import ActionCardWeekly from '@/components/action-card-weekly'
import FooterProgress from '@/components/footer-progress'
import { useDashboardStore } from '@/stores/dashboard'
import { Accordion, AccordionItem } from '@/components/ui/accordion'
import React from 'react'

export default function DashboardPage() {
  const init = useDashboardStore(s => s.initWeek)
  React.useEffect(() => { init() }, [init])

  return (
    <Guard>
      <AppHeader />
      <Accordion>
        <AccordionItem><ActionCardDaily dayNo={1} /></AccordionItem>
        <AccordionItem><ActionCardDaily dayNo={2} /></AccordionItem>
        <AccordionItem><ActionCardDaily dayNo={3} /></AccordionItem>
        <AccordionItem><ActionCardDaily dayNo={4} /></AccordionItem>
        <AccordionItem><ActionCardDaily dayNo={5} /></AccordionItem>
        <AccordionItem><ActionCardWeekly /></AccordionItem>
      </Accordion>
      <FooterProgress />
    </Guard>
  )
}
