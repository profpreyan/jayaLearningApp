import * as React from 'react'
export function Accordion({ children }: { children: React.ReactNode }) { return <div className="space-y-3">{children}</div> }
export function AccordionItem({ children }: { children: React.ReactNode }) { return <div className="space-y-2">{children}</div> }
