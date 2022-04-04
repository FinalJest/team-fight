import React from 'react';

export const getInputValue = (selector: string, formRef?: React.RefObject<HTMLFormElement>): string | undefined =>
    (formRef?.current ?? document)?.querySelector<HTMLInputElement>(selector)?.value.trim();
